let xCoord = 0
let xCoordStep = 200
let yCoord

const processFile = () => {
  const processLine = (line) => {
    if (line.startsWith("::")) {
      let coordStart = line.indexOf("<")
      let coordEnd = line.indexOf(">")
      let lineWithoutCoords
      if (coordStart >= 0 && coordEnd >= 0) {
        lineWithoutCoords = line.substring(0, coordStart) + line.substring(coordEnd + 1)
      } else if (coordStart >= 0 || coordEnd >= 0) {
        console.error("Invalid line with partial coordinates: " + line)
        process.exit(1)
        return
      } else {
        lineWithoutCoords = line
      }
      console.log(`${lineWithoutCoords} <${xCoord},${yCoord}>`)
      xCoord += xCoordStep
    } else {
      console.log(line)
    }
  }

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  
  var lingeringLine = "";
  
  process.stdin.on('data', function(chunk) {
      lines = chunk.split("\n");
  
      lines[0] = lingeringLine + lines[0];
      lingeringLine = lines.pop();
  
      lines.forEach(processLine);
  });
  
  process.stdin.on('end', function() {
      processLine(lingeringLine);
  });
}

if (process.argv.length >= 3) {
  yCoord = parseInt(process.argv[2])
  if (process.argv.length > 3) {
    xCoord = parseInt(process.argv[3])
  }
}

if (!yCoord) {
  console.error("SYNTAX: node addCoord.js yCoord [xCoordStart] [xCoordStep]")
} else {
  processFile()
}  


