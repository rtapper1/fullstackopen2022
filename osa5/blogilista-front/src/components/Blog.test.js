import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {

  test('renders title and author', () => {
    const blog = {
      title: 'Best blog ever',
      author: 'Myself',
      url: 'www.website.com',
      user: {
        name: 'Tiku Rapper'
      }
    }

    const mockOnUpdate = jest.fn()
    const mockSetNotification = jest.fn()

    const { container } = render(
      <Blog blog={blog} onUpdate={mockOnUpdate} setNotification={mockSetNotification} />
    )

    const element = container.querySelector('#compact-blog')

    expect(element.textContent).toContain('Best blog ever Myself')
  })

  test('renders title, author, url likes', async () => {
    const blog = {
      title: 'Best blog ever',
      author: 'Myself',
      url: 'www.website.com',
      user: {
        name: 'Tiku Rapper'
      }
    }

    const mockOnUpdate = jest.fn()
    const mockSetNotification = jest.fn()
    const { container } = render(
      <Blog blog={blog} onUpdate={mockOnUpdate} setNotification={mockSetNotification} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = container.querySelector('#long-blog')

    expect(element).not.toHaveStyle('display: none')
    expect(element.textContent).toContain('Best blog ever')
    expect(element.textContent).toContain('Myself')
    expect(element.textContent).toContain('www.website.com')
    expect(element.textContent).toContain('Tiku Rapper')
  })

  test('like button calls callback', async () => {
    const blog = {
      title: 'Best blog ever',
      author: 'Myself',
      url: 'www.website.com',
      user: {
        name: 'Tiku Rapper'
      }
    }

    const mockOnUpdate = jest.fn()
    const mockSetNotification = jest.fn()
    render(
      <Blog blog={blog} onUpdate={mockOnUpdate} setNotification={mockSetNotification} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    const like = screen.getByText('like')
    await user.click(button)
    await user.click(like)
    await user.click(like)

    expect(mockOnUpdate.mock.calls).toHaveLength(2)
  })

})

