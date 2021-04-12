describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Lola Khudoyberdieva',
      username: 'lolabunny',
      password: 'getyours'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('page can be opened', function() {
    cy.contains('blogs')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('lolabunny')
      cy.get('#password').type('getyours')
      cy.get('#login-button').click()
      cy.contains('Lola Khudoyberdieva logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('lolabunny')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      cy.get('.errorNotification').should('have.css', 'color', 'rgb(180, 32, 32)')
    })
  }) // end Login

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'lolabunny', password: 'getyours' })
    })

    it('a new blog can be created', function() {
      cy.contains('create new').click()
      cy.get('#input-title').type('a blog created by Lola')
      cy.get('#input-author').type('lolabunny')
      cy.get('#input-url').type('google.com')
      cy.contains('save').click()
      cy.contains('a blog created by Lola')
    })

    describe('and there is a single blog', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'new title', author: 'new author', url: 'new url' })
      })

      it('the user can like the blog', function() {
        cy.contains('new title')
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains(1)
      })

      it('the user can delete their blog', function() {
        cy.contains('view').click()
        cy.contains('new title')
        cy.contains('remove').click()
        cy.should('not.contain', 'new title')
      })
    })

    describe('and there are multiple blogs', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first', author: 'kiwi', url: 'myurl' })
          .then(() => cy.createBlog({ title: 'second', author: 'bunny', url: 'myurl', likes: 3 }))
          .then(() => cy.createBlog({ title: 'third', author: 'miyu', url: 'myurl', likes: 5 }))
      })
      it('blogs are in order of number of likes', function() {
        cy.get('.titleauthor').then(blog => {
          expect(blog[0].textContent).to.equal('third miyu')
          expect(blog[1].textContent).to.equal('second bunny')
          expect(blog[2].textContent).to.equal('first kiwi')
        })
      })

    })
    

  }) // end when logged in

})