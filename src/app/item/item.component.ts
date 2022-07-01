import {Component, OnInit, Input} from '@angular/core';
import {SupabaseService} from "../supabase.service";
import {Session} from "@supabase/supabase-js";

declare const Annotorious: any;
declare const ColorSelectorWidget: any;
declare const ColorFormatter: any;


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() session: Session | undefined;

  constructor(private readonly supabase: SupabaseService) { }

  ngOnInit() {
    this.supabase.authChanges((_, session) => this.session = session!);
    this.initAnnotorius();
  }

  initAnnotorius() {
    const annot = Annotorious.init({
        image: 'hallstatt',
        widgets: [
          ColorSelectorWidget,
          'COMMENT',
          'TAG'
        ],
        formatter: ColorFormatter
      });
    annot.loadAnnotations('annotations.w3c.json');
    annot.on('createAnnotation', function(annotation: any) {
      debugger;
    });
  }
}
