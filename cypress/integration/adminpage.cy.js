/// <reference types="cypress" />
import {
    navigate,
    login,
    goToSettings,
    collapseOption,
    goToTeams,
    addNewTeam,
    writeTeamName,
    ddTeamMember,
    addChannelsName,
    clickCreateTeamButton,
    checkTeamForm,
    checkInfoMessage,
  } from '../page-objects/setting'
import settingsPage from '../page-objects/settingPage.js'
const settings = new settingsPage();

describe('Admin page', () =>{
    
    beforeEach(() =>{
        navigate();
        login('asya.berezhnaya@gmail.com','5jC4xgj.!KchVrh');
        goToSettings();
        cy.wait(4000);
    })

    it("Create New Team", () =>{
        goToTeams();
        addNewTeam();
        writeTeamName();
        ddTeamMember();
        addChannelsName('Email');
        clickCreateTeamButton();
        checkTeamForm();
        checkInfoMessage();
    })
    it("Create Custom Channel" , () =>{
        collapseOption(1);
        settings.getChannelsCustom().click();
        settings.getAddCustomChannelsButton().click();
        settings.getCreateChannelButton().click()
        settings.getInfoMessage().should('be.visible');
    })
    it("Create custom chat message", () =>{
        collapseOption(1);
        settings.getChannelsCustom().click();
        settings.getAllCustomChannels().last().click();
        cy.get('[class="box-body flow-root"]').scrollIntoView();
        settings.getChannelIdentifier().invoke('text').should('not.be.empty').should('not.be.undefined').then((channelIdentifier) => {
			      // cy.log('channelIdentifier '+channelIdentifier);
            let customIdetifier = 'custom-' + channelIdentifier.slice(0,13);
            // cy.log('customIdetifier '+ customIdetifier);
            
            cy.request({
                method: 'POST',
                url:'https://app.trengo.com/api/v2/custom_channel_messages',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmY3ZGQ1MWVhZmRkNTA4NmUzZDhhYjY5YmRiNzY0MDBjYmM4MWMxNDIxMTAxYWU3NzgxMDM2MjcxN2Y2NGNlZTgzMTBmZmU5MzE0MDYzYTciLCJpYXQiOjE2NzI5MjUxNjkuNzU4MjkzLCJuYmYiOjE2NzI5MjUxNjkuNzU4Mjk1LCJleHAiOjQ3OTcwNjI3NjkuNzQ1OTYyLCJzdWIiOiI2MTI1OTQiLCJzY29wZXMiOltdfQ.jl07Qbpceek6y2qBLDzlnovv0oLIvpT-MXNCngz-Kslu-pCcKhS2tO9xc-DiBN8NJ1C1xL-rWSV6o7uTeRmIzA'
                  },
                  body: JSON.stringify({
                    contact: {identifier: customIdetifier},
                    body: {text: 'Animals are cool!'},
                    channel: channelIdentifier
                  })
            }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response).to.have.property('headers');
            });
		  });
    });
});