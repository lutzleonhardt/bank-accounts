import { Component, OnInit } from '@angular/core'
const w = window as any
const { ipcRenderer } = w.electron

@Component({
  selector   : 'll-app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
  constructor() {
  }

  async ngOnInit(): Promise<void> {
    const result = await bankingAsync()
    console.warn(result)
  }

}

function bankingAsync(): Promise<any> {
  return new Promise(r => {
    ipcRenderer.send('bankingRequest')
    ipcRenderer.on('bankingResponse', (event: any, arg: any) => {
      r(arg)
    })
  })
}
