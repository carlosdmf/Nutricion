class DietaFactory {

  static crearPlan(objetivo) {

    switch (objetivo) {

      // =====================================
      // BAJAR PESO
      // =====================================

      case 'bajar_peso':

        return {

          tipo:
            'Dieta Hipocalórica',

          calorias: 1500,

          recomendacion:
            'Reducir azúcares y frituras'

        };

      // =====================================
      // GANAR MUSCULO
      // =====================================

      case 'ganar_musculo':

        return {

          tipo:
            'Dieta Hiperproteica',

          calorias: 3000,

          recomendacion:
            'Consumir más proteínas'

        };

      // =====================================
      // MANTENER PESO
      // =====================================

      default:

        return {

          tipo:
            'Dieta Balanceada',

          calorias: 2200,

          recomendacion:
            'Mantener alimentación equilibrada'

        };

    }

  }

}

module.exports =
  DietaFactory;