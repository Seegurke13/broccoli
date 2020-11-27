import {Component, OnInit, TemplateRef} from '@angular/core';
import {SettingsService} from "../../editor2/settings.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public form: any;
  public forms: any;
  public toolbar: TemplateRef<any>;
  public  leftMenuOpen: boolean = true;
  public  rightMenuOpen: boolean = true;

  private settingsService: SettingsService;

  constructor(settingsService: SettingsService) {
    this.settingsService = settingsService;
    this.forms = [];
  }

  ngOnInit(): void {
    // this.settingsService.getObservable().subscribe((settings) => {
    //   this.toolbar = settings;
    // });
  }

  public delete() {
      this.forms.splice(this.forms.indexOf(this.form), 1);
  }

  public save() {
    if (!this.form.id) {
      this.forms.push(this.form);
    }
  }

  public add() {
    this.form = {
      name: 'New Form',
      definition: {}
    }
  }
}
