let projetos =
    JSON.parse(
        localStorage.getItem("gestao_projetos")
    ) || [

        {
            id: 1,
            nome: "Website Corporativo",
            responsavel: "João",
            progresso: 75,
            status: "andamento"
        },

        {
            id: 2,
            nome: "Aplicativo Mobile",
            responsavel: "Maria",
            progresso: 55,
            status: "andamento"
        },

        {
            id: 3,
            nome: "E-commerce",
            responsavel: "Pedro",
            progresso: 35,
            status: "planejamento"
        }

    ];
let tarefas =
    JSON.parse(
        localStorage.getItem("gestao_tarefas")
    ) || [
        {
            id: 1,
            nome: "Finalizar página inicial",
            projeto: "Website Corporativo",
            responsavel: "João",
            status: "andamento"
        },
        {
            id: 2,
            nome: "Corrigir sistema de login",
            projeto: "E-commerce",
            responsavel: "Pedro",
            status: "pendente"
        },
        {
            id: 3,
            nome: "Configurar banco de dados",
            projeto: "Aplicativo Mobile",
            responsavel: "Maria",
            status: "concluida"
        }

    ];

const usuarioDemo = {

    nome: "Administrador",

    email: "admin@email.com",

    senha: "123456",

    nivel: "Administrador"

};
const loginScreen =
    document.getElementById("loginScreen");

const app =
    document.getElementById("app");

const loginForm =
    document.getElementById("loginForm");

const erroLogin =
    document.getElementById("erroLogin");

const btnSair =
    document.getElementById("btnSair");

const nomeUsuario =
    document.getElementById("nomeUsuario");

const nivelUsuario =
    document.getElementById("nivelUsuario");

const avatarUsuario =
    document.getElementById("avatarUsuario");


function salvarDados() {

    localStorage.setItem(
        "gestao_projetos",
        JSON.stringify(projetos)
    );

    localStorage.setItem(
        "gestao_tarefas",
        JSON.stringify(tarefas)
    );

}
loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const senha =
            document
                .getElementById("senha")
                .value;


        if (
            email === usuarioDemo.email &&
            senha === usuarioDemo.senha
        ) {

            localStorage.setItem(
                "gestao_logado",
                "true"
            );


            iniciarSistema();

        } else {

            erroLogin.textContent =
                "E-mail ou senha incorretos.";

        }

    }
);

function iniciarSistema() {

    loginScreen.hidden = true;

    app.hidden = false;


    nomeUsuario.textContent =
        usuarioDemo.nome;


    nivelUsuario.textContent =
        usuarioDemo.nivel;


    avatarUsuario.textContent =
        usuarioDemo.nome
            .charAt(0)
            .toUpperCase();


    renderizarTudo();

}


if (
    localStorage.getItem("gestao_logado")
    === "true"
) {

    iniciarSistema();

}

btnSair.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "gestao_logado"
        );

        app.hidden = true;

        loginScreen.hidden = false;

        document
            .getElementById("email")
            .value = "";

        document
            .getElementById("senha")
            .value = "";

    }
);



const menus =
    document.querySelectorAll(
        ".menu-item"
    );


const paginas =
    document.querySelectorAll(
        ".page"
    );


function abrirPagina(nomePagina) {

    paginas.forEach(
        pagina => {

            pagina.hidden =
                pagina.id !==
                `page-${nomePagina}`;

        }
    );

    menus.forEach(
        menu => {

            menu.classList.toggle(
                "ativo",
                menu.dataset.page ===
                nomePagina
            );

        }
    );
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
menus.forEach(
    menu => {

        menu.addEventListener(
            "click",
            function () {

                abrirPagina(
                    this.dataset.page
                );

                document
                    .getElementById("sidebar")
                    .classList.remove("aberto");

            }
        );

    }
);
document
    .querySelectorAll("[data-page]")
    .forEach(
        elemento => {

            elemento.addEventListener(
                "click",
                function () {

                    if (
                        this.classList.contains(
                            "menu-item"
                        )
                    ) {
                        return;
                    }

                    abrirPagina(
                        this.dataset.page
                    );

                }
            );

        }
    );
const btnMenuMobile =
    document.getElementById(
        "btnMenuMobile"
    );


btnMenuMobile.addEventListener(
    "click",
    function () {

        document
            .getElementById("sidebar")
            .classList.toggle("aberto");

    }
);




function atualizarEstatisticas() {

    const totalProjetos =
        projetos.length;


    const totalTarefas =
        tarefas.length;


    const concluidas =
        tarefas.filter(
            tarefa =>
                tarefa.status ===
                "concluida"
        ).length;


    const pendentes =
        tarefas.filter(
            tarefa =>
                tarefa.status !==
                "concluida"
        ).length;


    document
        .getElementById(
            "estatProjetos"
        )
        .textContent =
        totalProjetos;


    document
        .getElementById(
            "estatTarefas"
        )
        .textContent =
        totalTarefas;


    document
        .getElementById(
            "estatConcluidas"
        )
        .textContent =
        concluidas;


    document
        .getElementById(
            "estatPendentes"
        )
        .textContent =
        pendentes;

}

function nomeStatus(status) {

    const nomes = {

        andamento:
            "Em andamento",

        pendente:
            "Pendente",

        concluida:
            "Concluída",

        planejamento:
            "Planejamento",

        concluido:
            "Concluído"

    };


    return nomes[status] ||
        status;

}


function renderizarProjetos() {

    const tabela =
        document.getElementById(
            "tabelaProjetos"
        );


    tabela.innerHTML = "";


    if (projetos.length === 0) {

        tabela.innerHTML = `

            <tr>

                <td colspan="5">

                    <div class="lista-vazia">

                        Nenhum projeto cadastrado.

                    </div>

                </td>

            </tr>

        `;

        return;

    }

    projetos.forEach(
        projeto => {

            const linha =
                document.createElement(
                    "tr"
                );


            linha.innerHTML = `

                <td>
                    <strong>
                        ${projeto.nome}
                    </strong>
                </td>

                <td>
                    ${projeto.responsavel}
                </td>

                <td>

                    <div class="mini-progresso">

                        <div
                            style="
                                width:
                                ${projeto.progresso}%
                            "
                        ></div>

                    </div>

                    <small>
                        ${projeto.progresso}%
                    </small>

                </td>

                <td>

                    <span
                        class="
                            status
                            ${projeto.status}
                        "
                    >
                        ${nomeStatus(
                            projeto.status
                        )}
                    </span>

                </td>

                <td>

                    <div class="acoes">

                        <button
                            class="
                                btn-acao
                                btn-editar
                            "
                            onclick="
                                editarProjeto(
                                    ${projeto.id}
                                )
                            "
                        >
                            ✏️
                        </button>

                        <button
                            class="
                                btn-acao
                                btn-deletar
                            "
                            onclick="
                                deletarProjeto(
                                    ${projeto.id}
                                )
                            "
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            tabela.appendChild(linha);

        }
    );

}

function renderizarDashboardProjetos() {

    const container =
        document.getElementById(
            "dashboardProjetos"
        );


    container.innerHTML = "";


    if (projetos.length === 0) {

        container.innerHTML = `
            <div class="lista-vazia">
                Nenhum projeto cadastrado.
            </div>
        `;

        return;

    }


    projetos
        .slice(0, 4)
        .forEach(
            projeto => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "item-projeto";


                div.innerHTML = `

                    <div class="item-icone">
                        📁
                    </div>

                    <div class="item-info">

                        <strong>
                            ${projeto.nome}
                        </strong>

                        <small>
                            ${projeto.progresso}% concluído
                        </small>

                    </div>

                    <span
                        class="
                            status
                            ${projeto.status}
                        "
                    >
                        ${nomeStatus(
                            projeto.status
                        )}
                    </span>

                `;


                container.appendChild(div);

            }
        );

}

const modalProjeto =
    document.getElementById(
        "modalProjeto"
    );


const formProjeto =
    document.getElementById(
        "formProjeto"
    );


document
    .getElementById("btnNovoProjeto")
    .addEventListener(
        "click",
        abrirNovoProjeto
    );


function abrirNovoProjeto() {

    document
        .getElementById("idProjeto")
        .value = "";


    document
        .getElementById("nomeProjeto")
        .value = "";


    document
        .getElementById(
            "responsavelProjeto"
        )
        .value = "";


    document
        .getElementById(
            "progressoProjeto"
        )
        .value = 0;


    document
        .getElementById(
            "statusProjeto"
        )
        .value =
        "planejamento";


    document
        .getElementById(
            "tituloModalProjeto"
        )
        .textContent =
        "Novo projeto";


    abrirModal(modalProjeto);

}

formProjeto.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const id =
            document
                .getElementById(
                    "idProjeto"
                )
                .value;


        const nome =
            document
                .getElementById(
                    "nomeProjeto"
                )
                .value
                .trim();


        const responsavel =
            document
                .getElementById(
                    "responsavelProjeto"
                )
                .value
                .trim();


        const progresso =
            Number(
                document
                    .getElementById(
                        "progressoProjeto"
                    )
                    .value
            );


        const status =
            document
                .getElementById(
                    "statusProjeto"
                )
                .value;


        if (id) {

            const projeto =
                projetos.find(
                    p =>
                        p.id ===
                        Number(id)
                );


            if (projeto) {

                projeto.nome =
                    nome;

                projeto.responsavel =
                    responsavel;

                projeto.progresso =
                    progresso;

                projeto.status =
                    status;

            }

        } else {

            projetos.push({

                id: Date.now(),

                nome,

                responsavel,

                progresso,

                status

            });

        }


        salvarDados();

        fecharModal(modalProjeto);

        renderizarTudo();

    }
);

function editarProjeto(id) {

    const projeto =
        projetos.find(
            p => p.id === id
        );


    if (!projeto) {
        return;
    }


    document
        .getElementById(
            "idProjeto"
        )
        .value =
        projeto.id;


    document
        .getElementById(
            "nomeProjeto"
        )
        .value =
        projeto.nome;


    document
        .getElementById(
            "responsavelProjeto"
        )
        .value =
        projeto.responsavel;


    document
        .getElementById(
            "progressoProjeto"
        )
        .value =
        projeto.progresso;


    document
        .getElementById(
            "statusProjeto"
        )
        .value =
        projeto.status;


    document
        .getElementById(
            "tituloModalProjeto"
        )
        .textContent =
        "Editar projeto";


    abrirModal(modalProjeto);

}

function deletarProjeto(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir este projeto?"
        );


    if (!confirmar) {
        return;
    }


    projetos =
        projetos.filter(
            projeto =>
                projeto.id !== id
        );


    salvarDados();

    renderizarTudo();

}

function renderizarTarefas() {

    const tabela =
        document.getElementById(
            "tabelaTarefas"
        );


    tabela.innerHTML = "";


    if (tarefas.length === 0) {

        tabela.innerHTML = `

            <tr>

                <td colspan="5">

                    <div class="lista-vazia">
                        Nenhuma tarefa cadastrada.
                    </div>

                </td>

            </tr>

        `;

        return;

    }


    tarefas.forEach(
        tarefa => {

            const linha =
                document.createElement(
                    "tr"
                );


            linha.innerHTML = `

                <td>
                    <strong>
                        ${tarefa.nome}
                    </strong>
                </td>

                <td>
                    ${tarefa.projeto}
                </td>

                <td>
                    ${tarefa.responsavel}
                </td>

                <td>

                    <span
                        class="
                            status
                            ${tarefa.status}
                        "
                    >
                        ${nomeStatus(
                            tarefa.status
                        )}
                    </span>

                </td>

                <td>

                    <div class="acoes">

                        <button
                            class="
                                btn-acao
                                btn-editar
                            "
                            onclick="
                                editarTarefa(
                                    ${tarefa.id}
                                )
                            "
                        >
                            ✏️
                        </button>

                        <button
                            class="
                                btn-acao
                                btn-deletar
                            "
                            onclick="
                                deletarTarefa(
                                    ${tarefa.id}
                                )
                            "
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            tabela.appendChild(linha);

        }
    );

}

function renderizarDashboardTarefas() {

    const container =
        document.getElementById(
            "dashboardTarefas"
        );


    container.innerHTML = "";


    if (tarefas.length === 0) {

        container.innerHTML = `
            <div class="lista-vazia">
                Nenhuma tarefa cadastrada.
            </div>
        `;

        return;

    }


    tarefas
        .slice(0, 4)
        .forEach(
            tarefa => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "item-tarefa";


                div.innerHTML = `

                    <div class="item-icone">
                        📋
                    </div>

                    <div class="item-info">

                        <strong>
                            ${tarefa.nome}
                        </strong>

                        <small>
                            ${tarefa.projeto}
                        </small>

                    </div>

                    <span
                        class="
                            status
                            ${tarefa.status}
                        "
                    >
                        ${nomeStatus(
                            tarefa.status
                        )}
                    </span>

                `;


                container.appendChild(div);

            }
        );

}

const modalTarefa =
    document.getElementById(
        "modalTarefa"
    );


const formTarefa =
    document.getElementById(
        "formTarefa"
    );


document
    .getElementById(
        "btnNovaTarefa"
    )
    .addEventListener(
        "click",
        abrirNovaTarefa
    );


document
    .getElementById(
        "btnNovaTarefaDashboard"
    )
    .addEventListener(
        "click",
        abrirNovaTarefa
    );


function abrirNovaTarefa() {

    document
        .getElementById(
            "idTarefa"
        )
        .value = "";


    document
        .getElementById(
            "nomeTarefa"
        )
        .value = "";


    document
        .getElementById(
            "projetoTarefa"
        )
        .value = "";


    document
        .getElementById(
            "responsavelTarefa"
        )
        .value = "";


    document
        .getElementById(
            "statusTarefa"
        )
        .value =
        "pendente";


    document
        .getElementById(
            "tituloModalTarefa"
        )
        .textContent =
        "Nova tarefa";


    abrirModal(modalTarefa);

}


formTarefa.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const id =
            document
                .getElementById(
                    "idTarefa"
                )
                .value;


        const nome =
            document
                .getElementById(
                    "nomeTarefa"
                )
                .value
                .trim();


        const projeto =
            document
                .getElementById(
                    "projetoTarefa"
                )
                .value
                .trim();


        const responsavel =
            document
                .getElementById(
                    "responsavelTarefa"
                )
                .value
                .trim();


        const status =
            document
                .getElementById(
                    "statusTarefa"
                )
                .value;


        if (id) {

            const tarefa =
                tarefas.find(
                    t =>
                        t.id ===
                        Number(id)
                );


            if (tarefa) {

                tarefa.nome =
                    nome;

                tarefa.projeto =
                    projeto;

                tarefa.responsavel =
                    responsavel;

                tarefa.status =
                    status;

            }

        } else {

            tarefas.push({

                id: Date.now(),

                nome,

                projeto,

                responsavel,

                status

            });

        }


        salvarDados();

        fecharModal(modalTarefa);

        renderizarTudo();

    }
);


function editarTarefa(id) {

    const tarefa =
        tarefas.find(
            t => t.id === id
        );


    if (!tarefa) {
        return;
    }


    document
        .getElementById(
            "idTarefa"
        )
        .value =
        tarefa.id;


    document
        .getElementById(
            "nomeTarefa"
        )
        .value =
        tarefa.nome;


    document
        .getElementById(
            "projetoTarefa"
        )
        .value =
        tarefa.projeto;


    document
        .getElementById(
            "responsavelTarefa"
        )
        .value =
        tarefa.responsavel;


    document
        .getElementById(
            "statusTarefa"
        )
        .value =
        tarefa.status;


    document
        .getElementById(
            "tituloModalTarefa"
        )
        .textContent =
        "Editar tarefa";


    abrirModal(modalTarefa);

}

function deletarTarefa(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta tarefa?"
        );


    if (!confirmar) {
        return;
    }


    tarefas =
        tarefas.filter(
            tarefa =>
                tarefa.id !== id
        );


    salvarDados();

    renderizarTudo();

}
function abrirModal(modal) {

    modal.classList.add("aberto");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function fecharModal(modal) {

    modal.classList.remove("aberto");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


document
    .getElementById(
        "fecharModalTarefa"
    )
    .addEventListener(
        "click",
        function () {

            fecharModal(modalTarefa);

        }
    );

document
    .getElementById(
        "fecharModalProjeto"
    )
    .addEventListener(
        "click",
        function () {

            fecharModal(modalProjeto);

        }
    );


document
    .querySelectorAll(".modal")
    .forEach(
        modal => {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        modal
                    ) {

                        fecharModal(
                            modal
                        );

                    }

                }
            );

        }
    );



function renderizarAlertas() {

    const container =
        document.getElementById(
            "listaAlertas"
        );


    container.innerHTML = "";


    const pendentes =
        tarefas.filter(
            tarefa =>
                tarefa.status ===
                "pendente"
        ).length;


    const andamento =
        tarefas.filter(
            tarefa =>
                tarefa.status ===
                "andamento"
        ).length;


    const projetosAndamento =
        projetos.filter(
            projeto =>
                projeto.status ===
                "andamento"
        ).length;


    if (
        pendentes === 0 &&
        andamento === 0
    ) {

        container.innerHTML = `

            <div class="alerta verde">

                ✅ Todas as tarefas estão
                em dia!

            </div>

        `;

        return;

    }


    if (pendentes > 0) {

        container.innerHTML += `

            <div class="alerta vermelho">

                ⚠️ Você possui
                <strong>
                    ${pendentes}
                </strong>
                tarefa(s) pendente(s).

            </div>

        `;

    }


    if (andamento > 0) {

        container.innerHTML += `

            <div class="alerta amarelo">

                🔄
                ${andamento}
                tarefa(s) estão em andamento.

            </div>

        `;

    }


    if (projetosAndamento > 0) {

        container.innerHTML += `

            <div class="alerta amarelo">

                📁
                ${projetosAndamento}
                projeto(s) estão em andamento.

            </div>

        `;

    }

}

const aumentarTexto =
    document.getElementById(
        "aumentarTexto"
    );


const altoContraste =
    document.getElementById(
        "altoContraste"
    );


aumentarTexto.addEventListener(
    "change",
    function () {

        document.body.classList.toggle(
            "texto-grande",
            this.checked
        );

        localStorage.setItem(
            "gestao_texto_grande",
            this.checked
        );

    }
);


altoContraste.addEventListener(
    "change",
    function () {

        document.body.classList.toggle(
            "alto-contraste",
            this.checked
        );

        localStorage.setItem(
            "gestao_alto_contraste",
            this.checked
        );

    }
);



if (
    localStorage.getItem(
        "gestao_texto_grande"
    ) === "true"
) {

    aumentarTexto.checked = true;

    document.body.classList.add(
        "texto-grande"
    );

}


if (
    localStorage.getItem(
        "gestao_alto_contraste"
    ) === "true"
) {

    altoContraste.checked = true;

    document.body.classList.add(
        "alto-contraste"
    );

}

function renderizarTudo() {

    salvarDados();

    atualizarEstatisticas();

    renderizarProjetos();

    renderizarDashboardProjetos();

    renderizarTarefas();

    renderizarDashboardTarefas();

    renderizarAlertas();

}