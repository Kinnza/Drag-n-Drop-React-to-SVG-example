import * as d3 from "d3";

/**
 * Draw the nodes.
 * Each time this is called we only draw the added nodes since we are using "enter" only
 */
class SVGDrawer {
  static draw(nodes) {
    d3.select("svg")
      .selectAll(".node")
      .data(nodes, (d) => d.id)
      .join((enter) => {
        // Draw a group node that will contain the squre and the text
        const node = enter
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");

        // Append the squre
        node
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 72)
          .attr("height", 72)
          .attr("fill", (d) => d.color);

        // Append the text
        node
          .append("text")
          .attr("x", 36)
          .attr("y", 36)
          .attr("width", 72)
          .attr("dominant-baseline", "middle")
          .attr("text-anchor", "middle")
          .text((d) => d.name);
      });
  }

  static dragOver(){
      d3.select("svg").classed("drag-over", true);
  }

  static dragLeave(){
      d3.select("svg").classed("drag-over", false);
  }

  static isOverDropArea ({left,top,width,height}) {
      const svg = document.getElementsByTagName("svg")[0];
      const boundingClientRect = svg.getBoundingClientRect();

      const svgX= boundingClientRect.left;
      const svgY= boundingClientRect.top;
      const svgHeight = boundingClientRect.height;
      const svgWidth = boundingClientRect.width;

      console.log("SVG : ", [svgX, svgY, svgWidth,svgHeight]);
      console.log("Object : ", [left, top, width,height]);

      return (
          (svgX <= left + width && (svgX + svgWidth) >= left )  && // X in range
          (svgY <= top + height && (svgY + svgHeight) >= top ) // Y in range
      );
  }

    /**
     * Convert DOM coordinates to SVG coordinates based on SVG offset and zoom level
     */
    static convertCoordinatesDOMtoSVG(x, y){
        const svg = d3.select("svg");
        const pt = svg.node().createSVGPoint();

        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(svg.node().getScreenCTM().inverse());
    };
}

export default SVGDrawer;
