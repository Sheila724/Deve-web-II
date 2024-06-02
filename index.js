const { createApp } = Vue;
const API_URL = 'http://localhost:3000';
createApp({
    data() {
        return {
            heroi: { vida: 100, pocao: 3, especial: 3, escudo: false, defender: 3 },
            vilao: { vida: 100, vidaAnteriorVilao: 100, especial: 0 },
            game: { ativo: false },
            log: [],
            mostrarBotao: false
        };
    },
    methods: {
        atacar(isHeroi) {
            if (!this.game.ativo) {
                if (isHeroi) {
                    this.acaoVilao();
                    this.vilao.vidaAnteriorVilao = this.vilao.vida;
                    this.log.push("Dynamis atacou!");
                    this.vilao.vida -= 8;
                } else {
                    if (this.heroi.escudo === false) {
                        this.log.push("Erinys atacou!");
                        this.heroi.vida -= 20;
                    } else if (this.heroi.escudo === true) {
                        this.log.push("Erinys atacou");
                        this.log.push("Dynamis defendeu o ataque! ");
                        this.heroi.escudo = false;
                        this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                    }
                }
                this.vitoriaHeroi();
            }
            this.limpandoLog();
        },
        async atualizarVidaNoBancoDeDados(vidaHeroi, vidaVilao) {
            try {
                const response = await fetch(`${API_URL}/atualizarVida`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ vidaHeroi, vidaVilao })
                });
                if (!response.ok) {
                    throw new Error('Erro ao atualizar a vida no banco de dados.');
                }
                console.log('Vida do herói e do vilão atualizada com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar a vida no banco de dados:', error);
            }
        },
        
        async atualizarVitoriasNoBancoDeDados() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                const { nome } = user;
                const vidaHeroi = this.heroi.vida;
                const vidaVilao = this.vilao.vida;
        
                const vitoriasHeroi = vidaVilao <= 0 ? 1 : 0;
                const vitoriasVilao = vidaHeroi <= 0 ? 1 : 0;
        
                try {
                    const response = await fetch(`${API_URL}/atualizarVitorias`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nome, vitoriasHeroi, vitoriasVilao })
                    });
        
                    console.log('Response status:', response.status);
        
                    if (response.status === 200) {
                        alert('Vitórias atualizadas com sucesso.');
                    } else {
                        const result = await response.json();
                        alert(result.message || 'Erro ao atualizar as vitórias.');
                    }
                } catch (error) {
                    console.error('Erro ao atualizar as vitórias:', error);
                    alert('Erro ao atualizar as vitórias.');
                }
            }
        },           
        
        defender(isHeroi) {
            if (!this.game.ativo) {
                if (isHeroi) {
                    if (this.heroi.defender > 0) {
                        this.heroi.defender -= 1;
                        this.heroi.escudo = true;
                        this.log.push("Dynamis se prepara para bloquear o ataque do vilão");
                        this.acaoVilao();
                    } else if (this.heroi.defender <= 0) {
                        this.log.push("Dynamis não tem mais escudo!");
                        this.acaoVilao();
                    }
                } else {
                    this.vilao.vida = this.vilao.vidaAnteriorVilao;
                    this.log.push("Erinys defendeu!");
                }
                this.vitoriaHeroi();
            }
            this.limpandoLog();
        },

        usarPocao(isHeroi) {
            if (!this.game.ativo) {
                if (isHeroi) {
                    if (this.heroi.pocao > 0 && this.heroi.vida < 85) {
                        this.heroi.pocao -= 1;
                        this.heroi.vida += 15;
                        this.log.push("Dynamis utilizou uma poção, recuperando 15 pontos de vida.");
                        this.acaoVilao();
                        this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                    } else if (this.heroi.pocao > 3) {
                        this.log.push("Impossível se curar, Dynamis utilizou todas as poções!");
                        this.acaoVilao();
                        this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                    } else if (this.heroi.vida > 85) {
                        this.log.push("É impossível Dynamis se curar com a vida acima de 85%!");
                        this.acaoVilao();
                        this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                    }
                } else {
                    if (this.vilao.vida < 85) {
                        this.vilao.vida += 5;
                        this.log.push("Erinys utilizou uma poção, recuperando 5 pontos de vida!");
                    } else {
                        this.log.push("É impossível Erinys se curar com a vida acima de 85%!");
                        this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                    }
                }
                this.vitoriaHeroi();
            }
            this.limpandoLog();
        },

        especial(isHeroi) {
            if (!this.game.ativo) {
                if (isHeroi) {
                    if (this.heroi.especial > 0) {
                        this.heroi.especial -= 1;
                        this.log.push("Dynamis fez um ataque ESPECIAL!!!");
                        this.vilao.vida -= 24;
                        this.acaoVilao();
                    } else {
                        this.log.push("Dynamis não possui mais ataque especial.");
                        this.acaoVilao();
                    }
                } else {
                    if (this.heroi.escudo === false) {
                        this.log.push("Erinys ESPECIAL!!");
                        this.heroi.vida -= 30;
                    } else if (this.heroi.escudo === true) {
                        this.log.push("Erinys ESPECIAL!!");
                        this.log.push("Dynamis defendeu o ATAQUE ESPECIAL!");
                        this.heroi.escudo = false;
                    }
                }
                this.vitoriaHeroi();
            }
            this.limpandoLog();
        },

        acaoVilao() {
            setTimeout(() => {
                const acoes = ['atacar', 'defender', 'usarPocao', 'especial'];
                const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
                this[acaoAleatoria](false);
                this.vitoriaVilao();
            }, 1400);
        },

        vitoriaHeroi() {
            if (this.vilao.vida <= 0) {
                this.vilao.vida = 0;
                this.game.ativo = true;
                this.mostrarBotao = true;
                setTimeout(() => { alert('Dynamis GANHOU!!'); }, 500);
            }
        },

        vitoriaVilao() {
            if (this.heroi.vida <= 0) {
                this.heroi.vida = 0;
                this.game.ativo = true;
                this.mostrarBotao = true;
                setTimeout(() => { alert('Erinys GANHOU HAHAHAHAHAHAHA'); }, 500);
            }
        },

        limpandoLog() {
            if (this.log.length > 6) {
                this.log.shift();
            }
        },

        resetGame() {
            this.heroi = { vida: 100, pocao: 3, especial: 3, escudo: false, defender: 3 };
            this.vilao = { vida: 100, vidaAnteriorVilao: 100, especial: 0 };
            this.game.ativo = false;
            this.log = [];
            this.mostrarBotao = false;
        },
        async adicionarHistorico(acao) {
            try {
                //let acao = this.acao;
                const response = await fetch(`${API_URL}/adicionarHistorico`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({acao})
                });
                if (!response.ok) {
                    throw new Error('Erro ao atualizar o historico no banco de dados.');
                }
                console.log('Historico atualizados com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar o historico no banco de dados:', error);
            }
        }
    }
}).mount("#app");



