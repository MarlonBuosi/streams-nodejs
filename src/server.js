
import http from 'http'
import { Readable } from 'stream'
import { randomUUID } from 'crypto'

//the star notation is used to inform js to not to wait the function to process all data
//if you already processed some data, already return it
function* run() {
  for (let index = 0; index <= 99; index++) {
    const data = {
      id: randomUUID(),
      name: `marlon-${index}`
    }

    yield data
  }
}

async function handler(request, response) {
  //request is a readable stream
  //response is the writeable stream
  const readable = new Readable({
    read() {
      for (const data of run()) {
        console.log('sending', data)
        this.push(JSON.stringify(data) + "\n")
      }

      //this inform that data has ended
      this.push(null)
    }
  })

  readable.pipe(response)
}

http.createServer(handler)
  .listen(3000).on('listening', () => console.log('server running at 3000'))


//read: read data
//transform: works like a data transformer, processing data
//write: use to write data on something
