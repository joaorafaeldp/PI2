const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

const product_link_veran = {
    'pao_frances (250g)':"https://www.delivery.veran.com.br/produtos/detalhe/1992/pao-frances-emb-250g",
    'leite_integral': "https://www.delivery.veran.com.br/produtos/detalhe/4396/leite-uht-italac-integral-1l",
    'alface': "https://www.delivery.veran.com.br/produtos/detalhe/9825/alface-crespa-hidro-j-watanabe-unid",
    'tomate': "https://www.delivery.veran.com.br/produtos/detalhe/1483/tomate-emb-500g",
    'pera':"https://www.delivery.veran.com.br/produtos/detalhe/1495/pera-portuguesa-emb-500g",
    'pepino': "https://www.delivery.veran.com.br/produtos/detalhe/4304/pepino-japones-emb-500g",
    'maca':"https://www.delivery.veran.com.br/produtos/detalhe/7905/maca-fuji-emb-300g",
    'abacaxi':"https://www.delivery.veran.com.br/produtos/detalhe/1290/abacaxi-perola-unid",
    'cafe':"https://www.delivery.veran.com.br/produtos/detalhe/5106/cafe-a-vacuo-pilao-tradicional-250g",
    'peito_frango':"https://www.delivery.veran.com.br/produtos/detalhe/2858/peito-de-frango-sem-osso-emb-600g",
    'creme_dental':"https://www.delivery.veran.com.br/produtos/detalhe/238/creme-dental-oral-b-1-2-3-anti-carie-70g",
    'sabonete':"https://www.delivery.veran.com.br/produtos/detalhe/5393/sabonete-lux-lirio-azul-125g",
    'coca_cola':"https://www.delivery.veran.com.br/produtos/detalhe/8691/refrigerante-coca-cola-2-litros",
    'contra_file':"https://www.delivery.veran.com.br/produtos/detalhe/2926/contra-file-bovino-reserva-emb-500g",
    'shampoo_condicionador':"https://www.delivery.veran.com.br/produtos/detalhe/3086/kit-shampoo-350ml--condicionador-175ml-pantene-liso-extremo",
    'detergente':"https://www.delivery.veran.com.br/produtos/detalhe/2046/detergente-liquido-ype-clear-500ml",
    'acucar':"https://www.delivery.veran.com.br/produtos/detalhe/1590/acucar-refinado-uniao-1kg",
    'cervejinha':"https://www.delivery.veran.com.br/produtos/detalhe/2544/cerveja-brahma-duplo-malte-sleek-lata-350ml"
};

const resultados = {};

(async function example() {
  const options = new firefox.Options();
  // options.headless(); // Descomente esta linha se desejar executar o navegador em modo headless
  const driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();

  for (const [chave, valor] of Object.entries(product_link_veran)) {
    console.log(chave, ' => ', valor);
  }

  const dataset_veran = new Array({ linha: 1 });

  for (const [chave, valor] of Object.entries(product_link_veran)) {
    await driver.get(valor);

    try {
      produto = await driver.findElement(By.xpath("/html/body/app-root/app-produto-detalhe/div/div/div[1]/div/div/h3")).getText();
    } catch {
      produto = chave + " " + "(chave)";
    }

    try {
      preco = await driver.findElement(By.xpath("/html/body/app-root/app-produto-detalhe/div/div/div[1]/div/div/app-tag-preco/div/div[2]")).getText();
    } catch (error) {
      preco = "Indisponível";
    }

    resultados[chave] = {
      produto,
      preco
    };

    console.log("veran ; ", chave, " ; ", produto, " ; ", preco);

    // Adicione um atraso de 10 segundos antes de acessar o próximo link
    await driver.sleep(10000);
  }

  console.log("Resultados:");
  console.log(resultados);

  driver.quit();
})();

