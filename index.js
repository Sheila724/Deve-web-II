const { createApp } = Vue;

class Personagem {
    constructor(nome, vida, forca) {
        this.nome = nome;
        this._vida = vida;
        this.forca = forca;
    }

    atacar(alvo) {
        alvo.receberDano(this.forca);
    }

    receberDano(dano) {
        this._vida -= dano;
        if (this._vida < 0) {
            this._vida = 0;
        } else if (this._vida > 100) {
            this._vida = 100;
        }
    }

    get vida() {
        return this._vida;
    }

    get vidaPercentual() {
        return (this._vida / 100) * 100;
    }
}

class Heroi extends Personagem {
    constructor(nome, vida, forca, habilidade) {
        super(nome, vida, forca);
        this.habilidade = habilidade;
    }

    usarHabilidade(alvo) {
        alvo.receberDano(this.forca * 2);
    }

    defender() {
        this._vida += 0;
        if (this._vida > 100) {
            this._vida = 100;
        }
    }

    usarPocao() {
        this._vida += 5;
        if (this._vida > 100) {
            this._vida = 100;
        }
    }

    correr() {
        this._vida -= 10;
        if (this._vida < 0) {
            this._vida = 0;
        }
    }
}

class Vilao extends Personagem {
    constructor(nome, vida, forca, fraqueza) {
        super(nome, vida, forca);
        this.fraqueza = fraqueza;
        this.intervaloAtaque = null;
        this.iniciarAtaqueAutomatico();
    }

    iniciarAtaqueAutomatico() {
        this.intervaloAtaque = setInterval(() => {
            if (this.vida > 0 && app.heroi.vida > 0) {
                this.atacarAutomaticamente();
            } else {
                clearInterval(this.intervaloAtaque);
            }
        }, 2500);
    }

    atacarAutomaticamente() {
        const alvo = app.heroi;
        this.atacar(alvo);
    }

    explorarFraqueza(alvo) {
        alvo.receberDano(this.forca * 3);
    }

    usarHabilidade(alvo) {
        alvo.receberDano(this.forca * 2);
    }
}        

const app = createApp({
    data() {
        return {
            heroi: new Heroi("Super-Herói", 100, 10, "Super Força"),
            vilao: new Vilao("Super-Vilão", 100, 8, "Luz Solar"),
            logHeroi: [],
            logVilao: []
        };
    },
    methods: {
        atacar(isHeroi) {
            if (isHeroi) {
                this.heroi.atacar(this.vilao);
                this.logHeroi.push(`${this.heroi.nome} atacou ${this.vilao.nome}`);
            } else {
                this.vilao.atacar(this.heroi);
                this.logVilao.push(`${this.vilao.nome} atacou ${this.heroi.nome}`);
            }
        },
        usarHabilidade() {
            this.heroi.usarHabilidade(this.vilao);
            this.logHeroi.push(`${this.heroi.nome} usou habilidade ${this.heroi.habilidade}`);
        },
        explorarFraqueza() {
            this.vilao.explorarFraqueza(this.heroi);
            this.logVilao.push(`${this.vilao.nome} explorou fraqueza: ${this.vilao.fraqueza}`);
        },
        defender() {
            this.heroi.defender();
            this.logHeroi.push(`${this.heroi.nome} defendeu`);
        },
        usarPocao() {
            this.heroi.usarPocao();
            this.logHeroi.push(`${this.heroi.nome} usou poção`);
        },
        correr() {
            this.heroi.correr();
            this.logHeroi.push(`${this.heroi.nome} correu`);
            this.reiniciarPartida();
        },
        usarHabilidadeVilao() {
            this.vilao.usarHabilidade(this.heroi);
            this.logVilao.push(`${this.vilao.nome} usou habilidade ${this.vilao.habilidade}`);
        },
        reiniciarPartida() {
            this.heroi = new Heroi("Super-Herói", 100, 10, "Super Força");
            this.vilao = new Vilao("Super-Vilão", 100, 8, "Luz Solar");
            this.logHeroi = [];
            this.logVilao = [];
        }
    }  
}).mount("#app");