import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AzureService {

    audioFile: File;
    audioInText: '';

    constructor(private http: HttpClient) {
    }

    azureSpeechToTextService(audioFile: File) {
        const headers = new HttpHeaders()
            .set('content-type', 'audio/wav')
            .set('Accept', '*/*')
            .set('Ocp-Apim-Subscription-Key', '640c875c440440abb2947b30bbd36940')
            .set('Access-Control-Allow-Headers', 'Content-Type')
            .set('Access-Control-Allow-Origin', '*');

        const azure_url = 'https://southeastasia.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US';
        return this.http.post(azure_url, audioFile, {'headers': headers});
    }

}
