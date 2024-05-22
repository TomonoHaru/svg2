import * as d3 from "d3";

function Chart(props) {
    const { data } = props

    const leftMargin = 50
    const rightMargin = 150
    const bottomMargin = 100
    const contentWidth = 500
    const contentHeight = 35 * (data.labels.length * data.series.length);
    const berHeight = 20
    const value = data.series.flatMap((item) => item.values);
    const space = berHeight / 2;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(value, (item) => item)])
        .range([0, contentWidth])
        .nice()
    console.log(data);
    const svgWidth = leftMargin + contentWidth + rightMargin
    const svgHeight = contentHeight + bottomMargin
    const color = d3.scaleOrdinal(d3.schemeCategory10)
    return <svg width={svgWidth} height={svgHeight}>
        <g transform={`translate(${leftMargin},10)`}>
            {
                xScale.ticks().map((x) => {
                    return <g transform={`translate(${xScale(x)},0)`}>
                        <line x1='0' y1='-10' x2='0' y2={contentHeight} stroke='black' opacity="0.5" />
                        <text y={contentHeight + 20} textAnchor='middle'>{x}</text>
                    </g>
                })
            }
            {
                data.labels.map((item, i) => {
                    return <g key={i} transform={`translate(0,${(space * (data.series.length - 1) + berHeight * data.series.length) / 2 + i * contentHeight / data.labels.length})`}>
                        <text x='-15' y='5' textAnchor='end'>{item}</text>
                        <line x1='-10' y1='0' x2='0' y2='0' stroke="black" opacity="0.5" />
                    </g>;
                })


            }

            {
                data.series.map(({ values }, i) => {
                    return values.map((item2, j) => {
                        return <g key={j} transform={`translate(0,${((j * (contentHeight / data.labels.length)) + ((berHeight + space) * i))})`}>
                            <rect x="0" y="0" width={xScale(item2)} height={berHeight} fill={color(i)} />
                        </g>;
                    })

                })
            }
            {
                data.series.map(({ name }, i) => {
                    return < g key={i} transform={`translate(0,${space + (berHeight * i)})`}>
                        <rect x={contentWidth + 10} y={berHeight * i} width={berHeight} height={berHeight} fill={color(i)} />
                        <text x={contentWidth + (berHeight * 2)} y={berHeight * (i + 1) - 5} textAnchor="start">{name}</text>
                    </g>;

                })

            }
            <line x1='0' y1={contentHeight - 5} x2={contentWidth} y2={contentHeight - 5} stroke='black' opacity="0.5" />
        </g>
    </svg >;

}

function App() {
    const data = {

        labels: ['A', 'B', 'C', 'D'],
        series: [
            {
                name: 'data',
                values: [123, 456, 789, 1111]
            },
            {
                name: 'another data',
                values: [234, 567, 891, 1024]
            },
            {
                name: 'and more',
                values: [567, 678, 789, 890]
            }
        ]
    }
    return <Chart data={data} />
}

export default App;