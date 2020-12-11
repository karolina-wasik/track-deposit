import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Track } from './../model/track.model';
import { Router } from '@angular/router';
import { TrackService } from '../service/track.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-update-track',
  templateUrl: './update-track.component.html',
  styleUrls: ['./update-track.component.css']
})
export class UpdateTrackComponent implements OnInit {

  trackForm: FormGroup;
  track: Track;

  constructor(
    private fb: FormBuilder,
    private trackService: TrackService,
    private router: Router,
    ) { }

    ngOnInit(): void {
      this.initializeForm();
    }
    initializeForm(): void {
      this.trackForm = this.fb.group({
        artist: '',
        title: ''
      });
    }

  goBackFromToTrackList() {
    this.router.navigate(['/tracks']);
  }

  fetchTrack(id: string): void {
    this.trackService.getTrackById(id).subscribe(
      answer => {
        this.trackForm.setValue(answer);
      }, error => {
        alert('Cannot load track' + JSON.stringify(error));
      }
    );
  }

  update(track: Track): void {
    this.fetchTrack(track.id);
    console.log('[update-trackComponent] Try to update track: ', track);
    this.trackService.updateTrack(track).subscribe(
      answer => {
        this.goBackFromToTrackList();
      }, 
      error => {
        console.error('[update-trackComponent] update error', error);
        alert('update-trackComponent] update error \n' + JSON.stringify(error));
      }
    );
  }

}