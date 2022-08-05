import {Component, OnInit} from '@angular/core';

declare var $: any;
import * as RecordRTC from 'recordrtc';
import {DomSanitizer} from '@angular/platform-browser';
import {AzureService} from '../services/azure.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
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

    constructor(private domSanitizer: DomSanitizer, private authService: AuthService, private azureService: AzureService) {
    }

    sanitize(url: string) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }

    startRecord() {
        this.recording = true;
        const mediaConstraints = {
            video: false,
            audio: true,
        };
        navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));
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
        const user = JSON.parse(localStorage.getItem('isLoggedIn')!);
        console.log(this.audioFile);
        console.log(user);
        this.makeStructureForApi();
    }

    makeStructureForApi() {
        this.azureService.azureSpeechToTextService(this.audioFile).subscribe((response: any) => {
            this.audioInText = response.DisplayText;
            console.log(this.audioInText);
            const user = JSON.parse(localStorage.getItem('isLoggedIn')!);
            if (user !== null) {
                this.authService.addUsersNoteToFirebase(this.audioInText, user);
            }
        });
    }

    errorCallback(error) {
        this.error = 'Can not play audio in your browser';
    }

    ngOnInit() {
    }
}
