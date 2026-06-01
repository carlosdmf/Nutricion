class DietaStrategy {

  constructor(estrategia) {

    this.estrategia = estrategia;

  }

  generarPlan() {

    return this.estrategia.generar();

  }

}

module.exports = DietaStrategy;