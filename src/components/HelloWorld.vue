<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="network-graph"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted: function () {
    let d3 = window.d3
    const width = 800
    const height = 500
    const nodes = [
      { id: 0, label: '葛飾' },
      { id: 1, label: '横浜' },
      { id: 2, label: '千葉' },
      { id: 3, label: '銚子' },
      { id: 4, label: '熊谷' },
      { id: 5, label: '日高' }
    ]
    var links = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 1, target: 3 },
      { source: 1, target: 3 },
      { source: 2, target: 1 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
      { source: 4, target: 5 },
      { source: 5, target: 3 }
    ]

    var force = d3.layout.force()
            .nodes(nodes)
            .links(links)
            .size([width, height])
            .distance(250)
            .friction(0.9)
            .charge(-100)
            .gravity(0.1)
            .start()

    // svg領域の作成
    var svg = d3.select('#network-graph').append('svg').attr({ width: width, height: height })

    // link線の描画(svgのline描画機能を利用)
    var link = svg.selectAll('line').data(links).enter().append('line').style({ stroke: '#ccc', 'stroke-width': 1 })

    // nodesの描画(今回はsvgの円描画機能を利用)
    var node = svg.selectAll('circle').data(nodes).enter().append('circle').attr({
      r: function () { return 30 }
    }).style({
      fill: 'orange'
    }).call(force.drag)

    // nodeのラベル周りの設定
    var label = svg.selectAll('text').data(nodes).enter().append('text').attr({
      'text-anchor': 'middle',
      fill: 'white',
      'font-size': '9px'
    }).text(function (data) { return data.label })

    // tickイベント(力学計算が起こるたびに呼ばれるらしいので、座標追従などはここで)
    force.on('tick', function () {
      link.attr({
        x1: function (data) { return data.source.x },
        y1: function (data) { return data.source.y },
        x2: function (data) { return data.target.x },
        y2: function (data) { return data.target.y }
      })
      node.attr({
        cx: function (data) { return data.x },
        cy: function (data) { return data.y }
      })
      // labelも追随するように
      label.attr({
        x: function (data) { return data.x },
        y: function (data) { return data.y }
      })
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
