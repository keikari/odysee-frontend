import {Component, Input, OnInit} from '@angular/core';
import {Discord} from '../../model/discord';

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.css']
})
export class DiscordComponent implements OnInit {
  @Input() discord: Discord;
  constructor() { }

  ngOnInit(): void {
  }

}
