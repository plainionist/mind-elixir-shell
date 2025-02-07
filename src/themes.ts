import { Theme } from 'mind-elixir'

export const Dark: Theme = {
  name: 'Dark',
  palette: ['#848FA0', '#748BE9', '#D2F9FE', '#4145A5', '#789AFA', '#706CF4', '#EF987F', '#775DD5', '#FCEECF', '#DA7FBC'],
  cssVar: {
    '--main-color': '#ffffff',
    '--main-bgcolor': '#4c4f69',
    '--color': '#cccccc',
    '--bgcolor': '#252526',
    '--panel-color': '255, 255, 255',
    '--panel-bgcolor': '45, 55, 72'
  }
}

export const Sunset: Theme = {
  name: 'Sunset',
  palette: ['#FFD700', '#FFA500', '#BA55D3', '#FF4500', '#32CD32', '#00BFFF', '#FF69B4', '#ADFF2F', '#FFC107', '#FF00FF'],
  cssVar: {
    '--main-color': '#ffffff',
    '--main-bgcolor': '#4c4f69',
    '--color': '#cccccc',
    '--bgcolor': '#252526',
    '--panel-color': '255, 255, 255',
    '--panel-bgcolor': '#cccccc'
  }
}

export const Sunrise: Theme = {
  name: 'Sunrise',
  palette: ['#FFF500', '#FF6200', '#BA00E9', '#FF2200', '#3AFF00', '#00DFFF', '#FF33AA', '#C7FF00', '#FFD700', '#FF00FF'],
  cssVar: {
    '--main-color': '#ffffff',
    '--main-bgcolor': '#4c4f69',
    '--color': '#cccccc',
    '--bgcolor': '#252526',
    '--panel-color': '255, 255, 255',
    '--panel-bgcolor': '#cccccc'
  }
}
