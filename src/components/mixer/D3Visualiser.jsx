import * as d3 from 'd3';

const fraction = (frac) => frac.includes("/") ? eval(frac) : parseFloat(frac);

function formatData(data) {
    return data.map((str) => {
        const [range, rest] = str.split(": ");
        const [startStr, endStr] = range.split(" → ").map(s => s.trim());

        const params = {};
        rest.split(" ").forEach((pair) => {
            const [key, value] = pair.split(":");
            params[key] = value;
        });

        return {
            start: fraction(startStr),
            end: fraction(endStr),
            duration: parseFloat(params.duration || (fraction(endStr) - fraction(startStr))),
            note: params.note || null,
            synth: params.s || null,
            params
        };
    });
}

function buildGraph(data) {
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const svg = d3
        .select("#d3Visualiser");
    
    svg.selectAll("rect").remove();

    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;

    const x = d3.scaleLinear()
        .domain([0, 1])
        .range([margin.left, width - margin.right]);


    const notes = [...new Set(data.map(d => d.note))].filter(Boolean);
    const y = d3.scalePoint()
        .domain(notes)
        .range([margin.top, height - margin.bottom])
        .padding(0.5);


    const color = d3.scaleOrdinal()
        .domain([...new Set(data.map(d => d.synth))])
        .range(d3.schemeCategory10);

        
    svg.selectAll("rect.event")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "event")
        .attr("x", d => x(d.start))
        .attr("y", d => y(d.note) - 10)
        .attr("width", d => x(d.end) - x(d.start))
        .attr("height", 20)
        .attr("fill", d => color(d.synth))
        .attr("stroke", "black")
        .append("title")
        .text(d => `${d.note}\n${d.start} → ${d.end}\n${JSON.stringify(d.params, null, 2)}`);
}

const D3Visualiser = () => {
    let errored = false;

    document.addEventListener("d3Data", (ev) => {
        if (errored) return;

        try {
            const data = formatData(ev.detail);
            buildGraph(data);
        } catch {
            errored = true;
        }
    });

    return (
        <>
            <svg id="d3Visualiser" className="audioVisualiser"></svg>
        </>
    );
}

export default D3Visualiser;