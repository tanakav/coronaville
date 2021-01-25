const estadosBrasil = [
    { "nome": "Acre", "sigla": "AC" },
    { "nome": "Alagoas", "sigla": "AL" },
    { "nome": "Amapá", "sigla": "AP" },
    { "nome": "Amazonas", "sigla": "AM" },
    { "nome": "Bahia", "sigla": "BA" },
    { "nome": "Ceará", "sigla": "CE" },
    { "nome": "Distrito Federal", "sigla": "DF" },
    { "nome": "Espírito Santo", "sigla": "ES" },
    { "nome": "Goiás", "sigla": "GO" },
    { "nome": "Maranhão", "sigla": "MA" },
    { "nome": "Mato Grosso", "sigla": "MT" },
    { "nome": "Mato Grosso do Sul", "sigla": "MS" },
    { "nome": "Minas Gerais", "sigla": "MG" },
    { "nome": "Pará", "sigla": "PA" },
    { "nome": "Paraíba", "sigla": "PB" },
    { "nome": "Paraná", "sigla": "PR" },
    { "nome": "Pernambuco", "sigla": "PE" },
    { "nome": "Piauí", "sigla": "PI" },
    { "nome": "Rio de Janeiro", "sigla": "RJ" },
    { "nome": "Rio Grande do Norte", "sigla": "RN" },
    { "nome": "Rio Grande do Sul", "sigla": "RS" },
    { "nome": "Rondônia", "sigla": "RO" },
    { "nome": "Roraima", "sigla": "RR" },
    { "nome": "Santa Catarina", "sigla": "SC" },
    { "nome": "São Paulo", "sigla": "SP" },
    { "nome": "Sergipe", "sigla": "SE" },
    { "nome": "Tocantins", "sigla": "TO" }
];

const baseUrl = 'https://covid19-brazil-api.now.sh/api/report/v1/';
let statesParagraph = document.querySelectorAll('.stateText');
renderCountryData('brazil');

async function getCountryStats(country) {
    const responseData = await fetch(baseUrl + country)
        .then(response => {
            if (response.status == 200) {
                return response;
            }
            return new Error('Nao foi possivel obter dados');
        })
        .catch(error => {
            console.error(error);
        });

    return responseData.json();
}

function renderCountryData(country) {
    getCountryStats(country).then(data => {
        const countryData = data.data;

        if (Object.keys(countryData).length > 0) {
            document.getElementById('total' + countryData.country + 'Confirmed').innerHTML = countryData.confirmed.toLocaleString('pt-BR');
            document.getElementById('total' + countryData.country + 'Deaths').innerHTML = countryData.deaths.toLocaleString('pt-BR');
        } else {
            document.getElementById('total' + countryData.country + 'Confirmed').innerHTML = 0;
        }
    });
}

let getStateData = async (state) => {
    const route = baseUrl + 'brazil/uf/' + state;

    const getStateDataPromise = (state) => new Promise((resolve, reject) => {
        fetch(route)
            .then(response => {
                if (response.status == 200) {
                    resolve(response.json());
                }

                reject(new Error('Nao foi possivel obter dados'));
            })
            .catch(error => {
                console.error(error);
            });
    });

    let result = await getStateDataPromise(state);
    return result;
};

statesParagraph.forEach((element) => {
    getStateData(element.dataset.sigla)
        .then(data => {
            var stateData;
            // stateData = estadosBrasil.find(state => state.sigla === data.uf).nome;
            // stateData += ': ' + data.cases.toLocaleString('pt-BR');
            stateData = data.cases.toLocaleString('pt-BR');
            element.innerHTML = stateData;
        }).catch(err => {
            console.error(err);
        })
});
