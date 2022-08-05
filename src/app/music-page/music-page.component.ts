import { Component, OnInit } from "@angular/core";
declare var $: any;
import * as RecordRTC from "recordrtc";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-music-page",
  templateUrl: "./music-page.component.html",
  styleUrls: ["./music-page.component.css"],
})
export class MusicPageComponent implements OnInit {
  musicResponse: any = [];

  title = "micRecorder";
  //Lets declare Record OBJ
  record;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url;
  error;
  musicsearchKey: string;
  constructor(private domSanitizer: DomSanitizer, private http: HttpClient) {}

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  startRecord() {
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  playMusic(url) {
    window.open(url, "_blank");
  }

  getMusics() {
    this.http
      .get("http://localhost:8080/search", {
        params: { searchKey: this.musicsearchKey },
      })
      .subscribe((res) => {
        this.musicResponse = res;
      });
  }

  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 44100,
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecord() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    console.log("blob", blob);
    console.log("url", this.url);
  }

  errorCallback(error) {
    this.error = "Can not play audio in your browser";
  }

  ngOnInit(): void {}
}
