import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { isPlatformBrowser } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-google",
  templateUrl: "./google.component.html",
  styleUrls: ["./google.component.scss"],
})
export class GoogleComponent implements OnInit {
  loading = true;
  latitude = 20.984068;
  longitude = 105.862511;
  markers: any;
  @ViewChild("streetviewMap", { static: true }) streetviewMap: any;
  @ViewChild("streetviewPano", { static: true }) streetviewPano: any;
  breadCrumbItems: Array<{}>;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    @Inject(PLATFORM_ID) private platformId: any,
    private mapsAPILoader: MapsAPILoader
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 500);
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.latitude = params["latitude"];
        this.longitude = params["longitude"];
      }
    });

    this.breadCrumbItems = [{ label: "MAP" }, { label: "LIST", active: true }];

    this._initPanorama();
    this._fetchData();
  }

  _initPanorama() {
    if (isPlatformBrowser(this.platformId)) {
      this.mapsAPILoader.load().then(() => {
        const center = { lat: this.latitude, lng: this.longitude };
        const map = new window["google"].maps.Map(
          this.streetviewMap.nativeElement,
          { center, zoom: 12, scrollwheel: false }
        );
        const panorama = new window["google"].maps.StreetViewPanorama(
          this.streetviewPano.nativeElement,
          {
            position: center,
            pov: { heading: 34, pitch: 10 },
            scrollwheel: false,
          }
        );
        map.setStreetView(panorama);
      });
    }
  }

  /**
   *
   * @param position position where marker added
   */
  placeMarker(position: any) {
    const lat = position.coords.lat;
    const lng = position.coords.lng;

    this.markers.push({ latitude: lat, longitude: lng });
  }

  private _fetchData() {
    this.markers = [{ lat: this.latitude, lng: this.longitude }];
  }

  back(): void {
    this._location.back();
  }
}
