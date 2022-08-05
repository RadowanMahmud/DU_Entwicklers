import { Component, OnInit } from "@angular/core";
declare var $: any;
import * as RecordRTC from "recordrtc";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  musicsearchKey: string;
  musicResponse: any = [
    {
      album: {
        album_type: "single",
        artists: [
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/2tIP7SsRs7vjIcLrU85W8J",
            },
            href: "https://api.spotify.com/v1/artists/2tIP7SsRs7vjIcLrU85W8J",
            id: "2tIP7SsRs7vjIcLrU85W8J",
            name: "The Kid LAROI",
            type: "artist",
            uri: "spotify:artist:2tIP7SsRs7vjIcLrU85W8J",
          },
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s",
            },
            href: "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
            id: "1uNFoZAHBGtllmzznpCI3s",
            name: "Justin Bieber",
            type: "artist",
            uri: "spotify:artist:1uNFoZAHBGtllmzznpCI3s",
          },
        ],
        available_markets: [
          "AD",
          "AE",
          "AG",
          "AL",
          "AM",
          "AO",
          "AR",
          "AT",
          "AU",
          "AZ",
          "BA",
          "BB",
          "BD",
          "BE",
          "BF",
          "BG",
          "BH",
          "BI",
          "BJ",
          "BN",
          "BO",
          "BR",
          "BS",
          "BT",
          "BW",
          "BY",
          "BZ",
          "CA",
          "CD",
          "CG",
          "CH",
          "CI",
          "CL",
          "CM",
          "CO",
          "CR",
          "CV",
          "CW",
          "CY",
          "CZ",
          "DE",
          "DJ",
          "DK",
          "DM",
          "DO",
          "DZ",
          "EC",
          "EE",
          "EG",
          "ES",
          "FI",
          "FJ",
          "FM",
          "FR",
          "GA",
          "GB",
          "GD",
          "GE",
          "GH",
          "GM",
          "GN",
          "GQ",
          "GR",
          "GT",
          "GW",
          "GY",
          "HK",
          "HN",
          "HR",
          "HT",
          "HU",
          "ID",
          "IE",
          "IL",
          "IN",
          "IQ",
          "IS",
          "IT",
          "JM",
          "JO",
          "JP",
          "KE",
          "KG",
          "KH",
          "KI",
          "KM",
          "KN",
          "KR",
          "KW",
          "KZ",
          "LA",
          "LB",
          "LC",
          "LI",
          "LK",
          "LR",
          "LS",
          "LT",
          "LU",
          "LV",
          "LY",
          "MA",
          "MC",
          "MD",
          "ME",
          "MG",
          "MH",
          "MK",
          "ML",
          "MN",
          "MO",
          "MR",
          "MT",
          "MU",
          "MV",
          "MW",
          "MX",
          "MY",
          "MZ",
          "NA",
          "NE",
          "NG",
          "NI",
          "NL",
          "NO",
          "NP",
          "NR",
          "NZ",
          "OM",
          "PA",
          "PE",
          "PG",
          "PH",
          "PK",
          "PL",
          "PS",
          "PT",
          "PW",
          "PY",
          "QA",
          "RO",
          "RS",
          "RW",
          "SA",
          "SB",
          "SC",
          "SG",
          "SI",
          "SK",
          "SL",
          "SM",
          "SN",
          "SR",
          "ST",
          "SV",
          "SZ",
          "TD",
          "TG",
          "TH",
          "TJ",
          "TL",
          "TN",
          "TO",
          "TR",
          "TT",
          "TV",
          "TW",
          "TZ",
          "UA",
          "UG",
          "US",
          "UY",
          "UZ",
          "VC",
          "VE",
          "VN",
          "VU",
          "WS",
          "XK",
          "ZA",
          "ZM",
          "ZW",
        ],
        external_urls: {
          spotify: "https://open.spotify.com/album/4QLAtpLNUsHEYrcHXmMIZZ",
        },
        href: "https://api.spotify.com/v1/albums/4QLAtpLNUsHEYrcHXmMIZZ",
        id: "4QLAtpLNUsHEYrcHXmMIZZ",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab67616d0000b27341e31d6ea1d493dd77933ee5",
            width: 640,
          },
          {
            height: 300,
            url: "https://i.scdn.co/image/ab67616d00001e0241e31d6ea1d493dd77933ee5",
            width: 300,
          },
          {
            height: 64,
            url: "https://i.scdn.co/image/ab67616d0000485141e31d6ea1d493dd77933ee5",
            width: 64,
          },
        ],
        name: "STAY (with Justin Bieber)",
        release_date: "2021-07-09",
        release_date_precision: "day",
        total_tracks: 1,
        type: "album",
        uri: "spotify:album:4QLAtpLNUsHEYrcHXmMIZZ",
      },
    },
  ];

  title = "micRecorder";
  //Lets declare Record OBJ
  record;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url;
  error;

  constructor(
    private domSanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient
  ) {}

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
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

  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 16000,
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
  ngOnInit() {}

  navigetToNews() {
    this.router.navigateByUrl("news");
  }
  navigetToNotes() {
    this.router.navigateByUrl("table-list");
  }
  navigetToMaps() {
    this.router.navigateByUrl("maps");
  }
  navigetToMusic() {
    this.router.navigateByUrl("music");
  }
}
