import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { io, Socket } from "socket.io-client";

const YTMD_URL = `http://localhost:10`
const YTMD_PWD = `KZVUP`

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {

  socket: Socket
  YTMD_override: string

  author
  title
  cover

  constructor(private activatedRoute: ActivatedRoute) {} 

  ngOnInit() {
    this.YTMD_override = this.activatedRoute.snapshot.paramMap.get('server')
    this.connect()
  }

  connect() {
    if(this.socket) return

    this.socket = io(this.YTMD_override || YTMD_URL, {
      transports: ['websocket', 'polling'],
      auth: {
        token: YTMD_PWD
      }
    })

    this.socket.on('connect', () => {
      console.log('connected')
      this.socket.on('tick', (data) => {
        console.log(data)
        this.author = data?.track?.author && !data?.player?.isPaused ? data.track.author.trim() : null
        this.title = data?.track?.title && !data?.player?.isPaused ? data.track.title.trim() : null
        this.cover = data?.track?.cover && !data?.player?.isPaused ? data.track.cover : null
      })
    })


    this.socket.on('close', () => {
      this.author = null
      this.title = null
      this.cover = null
    })
    this.socket.on('error', (error) => {
      console.log(error)
      this.author = null
      this.title = null
      this.cover = null})
  }

}
