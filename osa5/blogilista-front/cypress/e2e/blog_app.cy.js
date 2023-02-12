describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Tiku Rapper',
      username: 'rapper1',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'Tenri Happer',
      username: 'happer1',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
  })

  it('If no one is logged in front page shows login', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('Login succeeds', function() {
      cy.get('#username').type('rapper1')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Tiku Rapper logged in')
    })

    it('Login fails', function() {
      cy.get('#username').type('rapper1')
      cy.get('#password').type('wrongpass')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
      cy.contains('username')
      cy.contains('password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'rapper1', password: 'salasana' })
    })

    it('A blog can be created', function() {
      cy.get('#new-note-button').click()
      cy.get('#title-input').type('Stratechery')
      cy.get('#author-input').type('Ben Thompson')
      cy.get('#url-input').type('www.stratechery.com')
      cy.get('#blog-add-button').click()

      cy.contains('Stratechery Ben Thompson')
    })

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'Stratechery',
        author: 'Ben Thompson',
        url: 'www.stratechery.com'
      })
      cy.get('.compact-blog').get('.full-info-button').click()
      cy.contains('likes 0')
      cy.get('.long-blog').get('.like-button').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.createBlog({
        title: 'Stratechery',
        author: 'Ben Thompson',
        url: 'www.stratechery.com'
      })
      cy.get('.compact-blog').get('.full-info-button').click()
      cy.get('#main-view')
        .should('contain', 'Stratechery')
      cy.get('.long-blog').get('.delete-button').click()
      cy.get('#main-view')
        .should('not.contain', 'Stratechery')
    })

    it('A blog cannot be deleted by other user', function() {
      cy.createBlog({
        title: 'Stratechery',
        author: 'Ben Thompson',
        url: 'www.stratechery.com'
      })
      cy.get('.compact-blog').get('.full-info-button').click()
      cy.get('#logout-button').click()
      cy.get('.long-blog')
        .get('.delete-button')
        .should('not.exist')
      cy.login({ username: 'happer1', password: 'password' })
      cy.get('.compact-blog').get('.full-info-button').click()
      cy.get('.long-blog')
        .get('.delete-button')
        .should('not.exist')
    })

    it('Blogs are in descending likes-order', function() {
      cy.createBlog({
        title: 'Stratechery',
        author: 'Ben Thompson',
        url: 'www.stratechery.com'
      })
      cy.createBlog({
        title: 'Exponential view',
        author: 'Azeem Azhar',
        url: 'www.exponentialview.co'
      })

      // Expand Exponential view -blog and click like
      cy.contains('Exponential')
        .contains('view')
        .click()
      cy.get('.long-blog')
        .contains('Exponential')
        .contains('like')
        .click()
      cy.get('.long-blog')
        .contains('Exponential')
        .contains('likes 1')

      // Exponential view should be first
      cy.get('.blog').eq(0)
        .should('contain', 'Exponential view')

      // Expand Stratechery-blog and click like twice
      cy.contains('Stratechery')
        .contains('view')
        .click()
      cy.get('.long-blog')
        .contains('Stratechery')
        .contains('like')
        .click()
      cy.get('.long-blog')
        .contains('Stratechery')
        .contains('likes 1')
      cy.get('.long-blog')
        .contains('Stratechery')
        .contains('like')
        .click()
      cy.get('.long-blog')
        .contains('Stratechery')
        .contains('likes 2')

      // Stratechery should be first
      cy.get('.blog').eq(0)
        .should('contain', 'Stratechery')
    })
  })
})