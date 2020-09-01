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
}

export default SVGDrawer;
