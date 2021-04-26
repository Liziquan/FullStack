// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3000/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Log in to application')
      cy.contains('username')
      cy.contains('password')
    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.contains('mluukkai logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
      })      
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })
  
      it('A blog can be created', function() {
        cy.contains('create').click()
        cy.get('#title').type('a title created by cypress')
        cy.get('#author').type('an anthor created by cypress')
        cy.get('#url').type('a url created by cypress')
        cy.get('#create').click()
        cy.contains('a title created by cypress')
      })
    })
    
    describe('a blog exists', function () {
      beforeEach(function () {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.contains('create').click()
        cy.get('#title').type('a title created by cypress')
        cy.get('#author').type('an anthor created by cypress')
        cy.get('#url').type('a url created by cypress')
        cy.get('#create').click()
      //  cy.createBlog({
      //    title: 'Cypress creating a new blog',
      //    author: 'Cypress',
      //    url: 'https://www.cypress.io/',
      //  })
      })

      it('like a blog', function () {
        cy.contains('View').click()
        cy.get('#like-number').should('contain', 0)
        cy.get('#likebutton').click()
        cy.get('#like-number').should('contain', 1)
      })

      it('A user who created the blog can delete it', function () {
        cy.contains('View').click()
        cy.contains('a url created by cypress')
        cy.contains('remove').click()
        cy.contains('a url created by cypress').should('not.exist')
      })
    })
  })

  describe('multiple blogs exists', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3000/api/users/', user)
      
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'Cypress creating a new blog',
        author: 'Cypress',
        url: 'https://www.cypress.io/',
        likes: 15,
      })
      cy.createBlog({
        title: 'Second blog created',
        author: 'Cypress',
        url: 'https://www.cypress.io/',
        likes: 0,
      })
      cy.createBlog({
        title: 'Third blog created',
        author: 'Cypress',
        url: 'https://www.cypress.io/',
        likes: 2,
      })
    })

    it('Blogs are ordered based on number of likes, in descending order (from most likes till least likes)', function () {
      cy.get('[data-cy="blog"]').then(($blog) => {
        expect($blog).to.have.length(3)

        for (let i = 0; i < $blog.length; i++) {
          // Check if the number of likes of current blog is higher than or equal to that of next blog
          if (i < $blog.length - 1) {
            expect(
              Number($blog.find('[data-cy="likes"]')[i].innerText),
            ).to.be.least(
              Number($blog.find('[data-cy="likes"]')[i + 1].innerText),
            )
            // Check if number of likes of last blog is lower than or equal to that of first blog
          } else {
            expect(
              Number($blog.find('[data-cy="likes"]')[i].innerText),
            ).to.be.most(Number($blog.find('[data-cy="likes"]')[0].innerText))
          }
        }
      })
    })
  })