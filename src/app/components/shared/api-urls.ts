export const API_URL = {
    USER: {
        register: '/user/register',
        getConstituencies: '/user/getConstituencies',
        loginUser: '/user/loginUser'
    },
    PARTY: {
        addParty: '/party/addNewParty',
        getParties: '/party/getParties',
        updateParty: '/party/updateParty',
        deleteParty: '/party/deleteParty',
        getConstituencyParties: '/party/getConstituencyParties',
        getConstituencyElections: '/party/getConstituencyElections',
        castVote: '/party/castVote'
    },
    CANDIDATE: {
        addNewCandidate: '/candidate/addNewCandidate',
        getAllCandidates: '/candidate/getAllCandidates',
        updateCandidate: '/candidate/updateCandidate',
        deleteCandidate: '/candidate/deleteCandidate'    
    },
    CONSTITUENCY: {
        addNewConstituency: '/constituency/addNewConstituency',
        updateConstituency: '/constituency/updateConstituency',
        deleteConstituency: '/constituency/deleteConstituency',
        getConstituencies: '/constituency/getConstituencies'
    },
    ELECTIONS: {
        addElection: '/election/addElection',
        getElections: '/election/getElections',
        updateElection: '/election/updateElection',
        deleteElection: '/election/deleteElection',
        getConstituencyElections: '/election/getConstituencyElections'
    },
    VOTERS: {
        getAllVoters: '/voters/getAllVoters',
        convertVoterToAdmin: '/voters/convertVoterToAdmin',
        updateVoter: '/voters/updateVoter'
    }
}