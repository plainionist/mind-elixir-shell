import { MindElixirData } from 'mind-elixir'

export const softwareEngineering: MindElixirData = {
  nodeData: {
    id: 'root',
    topic: 'Software Engineering',
    children: [
      {
        id: 'child-1',
        topic: 'Development Process',
        children: [
          {
            id: 'child-1-1',
            topic: 'Agile'
          },
          {
            id: 'child-1-2',
            topic: 'Waterfall'
          }
        ]
      },
      {
        id: 'child-2',
        topic: 'Software Design',
        children: [
          {
            id: 'child-2-1',
            topic: 'Patterns',
            children: [
              { id: 'child-2-1-1', topic: 'Adapter' },
              { id: 'child-2-1-2', topic: 'Factory' }
            ]
          },
          {
            id: 'child-2-2',
            topic: 'Architecture',
            children: [
              { id: 'child-2-2-1', topic: 'Clean Architecture' },
              { id: 'child-2-2-2', topic: 'Pipes & Filters' }
            ]
          }
        ]
      },
      {
        id: 'child-3',
        topic: 'Quality Assurance',
        children: [
          {
            id: 'child-3-1',
            topic: 'Testing',
            children: [
              { id: 'child-3-1-1', topic: 'Unit Testing' },
              { id: 'child-3-1-2', topic: 'Integration Testing' },
              { id: 'child-3-1-3', topic: 'End-to-End Testing' }
            ]
          },
          {
            id: 'child-3-2',
            topic: 'Code Quality',
            children: [
              { id: 'child-3-2-1', topic: 'Linting' },
              { id: 'child-3-2-2', topic: 'Code Reviews' }
            ]
          }
        ]
      }
    ]
  }
}
