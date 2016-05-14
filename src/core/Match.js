/**
 * Get a given statistic of a all soldiers per team.
 *
 * @param {string} stat Stat to get.
 *
 * @return {Map} Stats per team
 */
function soldierStatsByTeam (stat) {
    let resultsByTeam = new Map();

    for (let [teamName, soldiers] of this.teams.entries()) {
        for (let soldier of soldiers) {
            let teamResult = resultsByTeam.get(teamName);

            if (teamResult) {
                resultsByTeam.set(teamName, teamResult + soldier[stat]);
            } else {
                resultsByTeam.set(teamName, soldier[stat]);
            }
        }
    }
}

class Match {
    constructor (teams) {
        this.matchTime = 0;
        this.matchDuration = 300000;
        this.soldiers = new Set();
        this.teamNames = [];
        this.teams = new Map();

        for (let teamName of teams) {
            this.teamNames.push(teamName);
            this.teams.set(teamName, new Set());
        }
    }

    teamWithLeastPlayers () {
        let leastTeamName = null;
        let minCount = Number.MAX_VALUE;

        for (let teamName of this.teamNames) {
            let count = this.teams.get(teamName).size;

            if (count < minCount) {
                leastTeamName = teamName;
                minCount = count;
            }
        }

        return leastTeamName;
    }

    addSoldier (soldier, teamName) {
        if (!teamName) {
            teamName = this.teamWithLeastPlayers();
        }

        // FIXME get this out of here?
        soldier.team = teamName;

        let team = this.teams.get(teamName);

        if (team) {
            team.add(soldier);
            this.soldiers.add(soldier);

            return true;
        }

        return false;
    }

    sortedScores () {
        let teams = new Map();

        for (let soldier of new Set([...this.soldiers])) {
            let team = teams.get(soldier.team);

            if (team) {
                team.kills += soldier.totalKills;
                team.deaths += soldier.totalDeaths;
                team.soldiers.push(soldier);
            } else {
                teams.set(soldier.team, {
                    kills: soldier.totalKills,
                    deaths: soldier.totalDeaths,
                    soldiers: [soldier]
                });
            }
        }

        for (let team of teams.values()) {
            team.soldiers.sort((a, b) => b.kills - a.kills);
        }

        return new Map([...teams.entries()].sort((teamA, teamB) => {
            return teamB[1].kills - teamA[1].kills;
        }));
    }

    removeSoldier (soldier) {
        for (const team of this.teams.values()) {
            if (team.has(soldier)) {
                team.delete(soldier);
            }
        }

        this.soldiers.delete(soldier);
    }

    killsByTeam () {
        return soldierStatsByTeam('kills');
    }

    deathsByTeam () {
        return soldierStatsByTeam('deaths');
    }

    deadSoldiers () {
        return Array.from(this.soldiers).filter(soldier => soldier.dead);
    }

    start () {

    }

    end () {

    }

    update (delta) {
        this.matchTime += delta;

        if (this.matchTime >= this.matchDuration) {
            this.end();
        }
    }
}

export default Match;
