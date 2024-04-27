const { createApp } = Vue;

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
                    }
                }
                this.vitoriaHeroi();
            }
            this.limpandoLog();
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
                    } else if (this.heroi.pocao > 3) {
                        this.log.push("Impossível se curar, Dynamis utilizou todas as poções!");
                        this.acaoVilao();
                    } else if (this.heroi.vida > 85) {
                        this.log.push("É impossível Dynamis se curar com a vida acima de 85%!");
                        this.acaoVilao();
                    }
                } else {
                    if (this.vilao.vida < 85) {
                        this.vilao.vida += 5;
                        this.log.push("Erinys utilizou uma poção, recuperando 5 pontos de vida!");
                    } else {
                        this.log.push("É impossível Erinys se curar com a vida acima de 85%!");
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
        }
    }
}).mount("#app");
