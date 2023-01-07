/// <reference types="cypress" />

//Page object
class settingsPage{
    getChannelsCustom(){
        return cy.get('[href="/admin/channels2/custom"]').should('be.visible').and('exist');
    }
    getAddCustomChannelsButton(){
        return cy.get('.add-btn').should('be.visible').and('exist');
    }
    getCreateChannelButton(){
        return cy.get('[class="btn success text-white"]').should('be.visible').and('contain', 'Create channel');
    }
    getChannelIdentifier(){
        return cy.get('[class="p-3 mt-2"]');
    }
    getAllCustomChannels(){
        return cy.get('[class="settings-sidebar-item"]');
    }
    getInfoMessage(){
        return cy.get('.growl-message');
    }
}
export default settingsPage