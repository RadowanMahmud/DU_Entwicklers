import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {AzureService} from '../services/azure.service';

declare var $: any;
import * as RecordRTC from 'recordrtc';

import {DomSanitizer} from '@angular/platform-browser';
import {Router, NavigationEnd, NavigationStart} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    title = 'micRecorder';
    // Lets declare Record OBJ
    record;
    // Will use this flag for toggeling recording
    recording = false;
    // URL of Blob
    url;
    error;
    audioFile: File;
    audioInText: '';

    constructor(private http: HttpClient,private domSanitizer: DomSanitizer, private azureService: AzureService, private router: Router) {
    }


    sanitize(url: string) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }

    startRecord() {
        this.recording = true;
        const mediaConstraints = {
            video: false,
            audio: true
        };
        navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }

    successCallback(stream) {
        const options = {
            mimeType: 'audio/wav',
            numberOfAudioChannels: 1,
            sampleRate: 44100,
        };
        // Start Actuall Recording
        const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
        this.record = new StereoAudioRecorder(stream, options);
        this.record.record();
    }

    stopRecord() {
        this.recording = false;
        this.record.stop(this.processRecording.bind(this));
    }

    processRecording(blob) {
        this.url = URL.createObjectURL(blob);
        console.log('blob', blob);
        console.log('url', this.url);
        this.audioFile = new File([blob], 'audioFile.wav');
        this.makeStructureForApi();
    }

    makeStructureForApi() {
        this.azureService.azureSpeechToTextService(this.audioFile).subscribe((response: any) => {
            this.audioInText = response.DisplayText;
            console.log(this.audioInText);
        });
    }

    errorCallback(error) {
        this.error = 'Can not play audio in your browser';
    }

    ngOnInit() {
    }

    navigetToNews() {
        this.router.navigateByUrl('news');
    }

    navigetToNotes() {
        this.router.navigateByUrl('table-list');
    }

    navigetToMaps() {
        this.router.navigateByUrl('maps');
    }

    navigetToMusic() {
        this.router.navigateByUrl('music');
    }
    search(){
      if(this.audioInText){
        this.http.get('http://localhost:8080/searchNews?query='+encodeURI(this.audioInText)).subscribe(
          res =>{
            console.log(res)
          }
        )
      }
    }
}
