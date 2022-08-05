import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

declare var $: any;
import * as RecordRTC from 'recordrtc';
import {DomSanitizer} from '@angular/platform-browser';

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

    constructor(private domSanitizer: DomSanitizer, private http: HttpClient) {
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
        const headers = new HttpHeaders()
            .set('content-type', 'audio/wav')
            .set('Accept', '*/*')
            .set('Ocp-Apim-Subscription-Key', '640c875c440440abb2947b30bbd36940')
            .set('Access-Control-Allow-Headers', 'Content-Type')
            .set('Access-Control-Allow-Origin', '*');

        const azure_url = 'https://southeastasia.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US';
        this.http.post(azure_url, this.audioFile, {'headers': headers}).subscribe((res: any) => {
            this.audioInText = res.DisplayText;
            console.log(this.audioInText);
        });
    }

    errorCallback(error) {
        this.error = 'Can not play audio in your browser';
    }

    ngOnInit() {
    }

}
