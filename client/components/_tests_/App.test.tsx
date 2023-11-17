//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderApp } from '../../test/setup'

// mock out http requests
import nock from 'nock'

nock.disableNetConnect()

import {
  waitFor,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react/pure'

describe('<App />', () => {
  it('shows a list of todos', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, [
        { id: 1, description: 'eat' },
        { id: 2, description: 'sleep' },
      ])

    const screen = renderApp()

    await waitForElementToBeRemoved(() => screen.queryByText(/Loading../i))

    const todos = screen.getByText(/sleep/i)
    expect(todos).toBeVisible()
    // expect(todos).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})
