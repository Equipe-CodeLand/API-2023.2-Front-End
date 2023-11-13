import { Chart } from "react-google-charts";

function JsonForData(variavel) {
    var arrIndice = []
    var arrValues = []
    arrIndice = Object.keys(variavel);
    arrValues = Object.values(variavel);
    let dadoChamado = []
    for (let i = 0; i < arrValues[0].length; i++) {
        dadoChamado[i] = arrValues.map((item) => { return item[i] })
    }
    dadoChamado.unshift(arrIndice)
    return dadoChamado
}

export default function Grafico(props) {
    return (
        <div className="grafico">
            <h3>{props.title}</h3>
            <Chart
                chartType="ColumnChart"
                loader={<div className="loading">Carregando Grafico...</div>}
                data={JsonForData(props.data)}
                legendToggle
            />
        </div>
    );
}