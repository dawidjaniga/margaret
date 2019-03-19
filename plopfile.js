const componentExists = require('./resources/assets/app/utils/componentExists')

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'application component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'component name please',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component with this name already exists'
            : true
        }

        return 'The name is required'
      }
    },
    {
      type: 'confirm',
      name: 'wantAntDesign',
      default: true,
      message: 'Do you want to use Ant Design?'
    },
    {
      type: 'confirm',
      name: 'wantStyledComponents',
      default: true,
      message: 'Do you want to use StyledComponents?'
    }
    ],
    actions: [{
      type: 'add',
      path: 'resources/assets/app/components/{{properCase name}}.js',
      templateFile: 'plop-templates/component.hbs'
    }]
  })
}
