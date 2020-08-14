function Plots(id) {

//Read samples.json
d3.json("samples.json").then (data =>{
    console.log(data)
    var id = data.samples[0].otu_ids;
    console.log(id)
    var Values =  data.samples[0].sample_values.slice(0,10).reverse();
    console.log(Values)
    var labels =  data.samples[0].otu_labels.slice(0,10);
    console.log (labels)

    var OTU_top = (data.samples[0].otu_ids.slice(0, 10)).reverse();

    var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)

    var labels = data.samples[0].otu_labels.slice(0,10);
    
    data.samples[0].otu_labels.slice(0,10);
    console.log(`OTU_labels: ${labels}`)
    var trace = {
        x: Values,
        y: OTU_id,
        text: labels,
        marker: {
            color: 'blue'},
        type:"bar",
        orientation: "h",
    };

    var data = [trace];

    var layout = {
        title: "Top 10 OTU",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        } 
    };

// Creating the bar plot
     Plotly.newPlot("bar", data, layout);

     // The bubble chart
     var trace2 = {
         x: data.samples[0].otu_ids,
         y: data.samples[0].sample_values,
         mode: "markers",
         marker: {
             size: data.samples[0].sample_values,
             color: data.samples[0].otu_ids
         },
         text: data.samples[0].otu_labels

     };

     var layout2 = {
         xaxis:{title: "OTU ID"},
         height: 600,
         width: 1000
     };

     var data2 = [trace2]; 
     
     Plotly.newPlot("bubble", data2, layout2); 
    });
}
 
function DemoInfo(id) {

    d3.json("samples.data").then ((data) => {
        var metadata = data.meta;
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id) [0];
        var demoinfo = d3.select("#sample-metadata");

        demoinfo.html("");

        Object.entries(result).forEach((key) => {
            demoinfo.append("h5").text(key[0].UpperCase() + ": " + key[1] + "\n");
        });
    });
}

function change(id) {
    getPlots(id);
    getDemoInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("sample.json").then((data) => {
        console.log(data)
        
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlots(data.name[0]);
        getDemoInfo(data.name[0]);
    });
}

init ();