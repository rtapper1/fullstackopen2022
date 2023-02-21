import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input form', () => {
  test('Test out input form', async () => {
    const handleSubmit = jest.fn()
    const setNotification = jest.fn()

    const { container } = render(
      <Input onBlogAdd={handleSubmit} setNotification={setNotification} />
    )

    const user = userEvent.setup()
    const newNote = screen.getByText('new note')
    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')

    await user.click(newNote)
    await user.type(titleInput, 'A new blog')
    await user.type(authorInput, 'It is me')
    await user.type(urlInput, 'www.meblg.com')

    const create = screen.getByText('create')
    await user.click(create)

    expect(handleSubmit.mock.calls[0][0]).toEqual({
      title: 'A new blog',
      author: 'It is me',
      url: 'www.meblg.com',
    })
  })
})
