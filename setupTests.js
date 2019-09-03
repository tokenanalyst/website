import React from 'react'

global.mocksClear = mocks => mocks.forEach(mock => mock.mockClear())

global.createComponentWithProps = (Component, props) => <Component {...props} />
global.createComponentWithProps.displayName = 'testComponent'
