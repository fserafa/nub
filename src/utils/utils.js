var _ = require('lodash');

module.exports = {
    formatData(data) {
        let chunked = _.chunk(data, 3);
        let formated = [];

        chunked.map(data => {
            data[2] = parseFloat(data[2].replace(',', ''));
        });

        chunked.map((chunk, index) => {
            let obj = {};
            let keys = ['date', 'name', 'value']

            keys.map((key, i) => {
                _.updateWith(obj, [key], _.constant(chunked[index][i]), Object);
            })

            obj.fiador = "";

            formated = [...formated, obj];
        })

        let linesToRemove = formated.filter(f => (
            (f.name.toLowerCase().includes('pagamento')) ||
            (f.name.toLowerCase().includes('fatura')) ||
            (f.date.toLowerCase().includes('emissão e envio')) ||
            (f.date.toLowerCase().includes('transações')))
        );

        if (linesToRemove) {
            linesToRemove.map(p => {
                let index = formated.indexOf(p);
                formated.splice(index, 1)
            })
        }

        return formated;
    },

    extractVencimento(info) {
        let filtered = info.filter(i => i.toLowerCase().includes('vencimento'))[0];

        let index = info.indexOf(filtered);

        return info[index + 1]
    }
}