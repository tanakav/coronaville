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

const baseUrl = 'https://covid19-brazil-api.now.sh/api/report/v1/brazil';
getBrazilStats();
getStatsPerState('sp');

function getBrazilStats() {
    fetch(baseUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return new Error('Nao foi possivel obter dados');
        })
        .catch(error => {
            console.error(error);
        })
        .then(data => {
            const responseJson = data.data;

            if (Object.keys(responseJson).length > 0) {
                console.log(responseJson);
                document.getElementById('totalBrasilConfirmed').innerHTML = responseJson.confirmed.toLocaleString('pt-BR');
            } else {
                document.getElementById('totalBrasilConfirmed').innerHTML = 0;
            }
        });
}

function getStatsPerState(sigla) {
    fetch(baseUrl + '/uf/' + sigla)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return new Error('Nao foi possivel obter dados');
        })
        .catch(error => {
            console.error(error);
        })
        .then(data => {
            console.log(data);
        });
}

