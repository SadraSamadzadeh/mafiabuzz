export default {
    methods: {
        checkIdentity(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.identityChecked = true
                }
            })
        },
        checkRole(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.roleChecked = true
                }
            })
        },
        checkReturner(target){
            for (let i = 0; i < this.gameSettings.selectedRoles.length; i++) {
                if(this.gameSettings.selectedRoles[i].player === target
                   && this.gameSettings.selectedRoles[i].ability.returner
                   && !this.gameSettings.selectedRoles[i].status.hacked)
                    {
                    return true
                }
            }
        },
        damageReturn(player){
            this.kill(player)
        },
        hack(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.hacked = true
                }
            })
        },
        heal(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.healed = true
                }
            })
        },
        link(target1, target2){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target1){
                    element.status.linked = true
                }
                if(element.player === target2){
                    element.status.linked = true
                }
            })
        },
        kill(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target && !element.status.healed){
                    if(element.status.shield){
                        element.status.shield = false
                    } else{
                        element.status.dead = true
                    }
                    if(element.status.linked){
                        this.gameSettings.selectedRoles.forEach(el => {
                            if(el.status.linked && !el.status.healed){
                                el.status.dead = true
                                el.status.linked = false
                            }
                        })
                    }
                    if(element.ability.reviver){
                        this.gameSettings.selectedRoles.forEach(el => {
                            if(el.status.minion && !el.status.healed){
                                el.status.dead = true
                                el.status.minion = false
                            }
                        })
                    }
                    if(element.status.shield){
                        this.gameSettings.selectedRoles.forEach(el => {
                            if(el.status.linked && !el.status.healed){
                                el.status.dead = true
                                el.status.linked = false
                            }
                        })
                    }
                }
            })
        },
        replacePlayer(target, replacer){
            this.kill(replacer)
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    this.trackingStatus(element.status)
                    element.name = this.replacingRoles.miniYakuza.name
                    element.icon = this.replacingRoles.miniYakuza.icon
                    element.alt = this.replacingRoles.miniYakuza.alt
                    element.description = this.replacingRoles.miniYakuza.description
                    element.action = this.replacingRoles.miniYakuza.action
                    element.actionStatus = this.replacingRoles.miniYakuza.actionStatus
                    element.ability = this.replacingRoles.miniYakuza.ability
                    element.status = this.replacingRoles.miniYakuza.status
                    element.status.linked = this.freezeStatus.linked
                    element.status.hacked = this.freezeStatus.hacked
                    element.status.healed = this.freezeStatus.healed
                    element.status.silenced = this.freezeStatus.silenced
                }
            })
        },
        resurrect(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.name = this.replacingRoles.skeleton.name
                    element.icon = this.replacingRoles.skeleton.icon
                    element.alt = this.replacingRoles.skeleton.alt
                    element.description = this.replacingRoles.skeleton.description
                    element.action = this.replacingRoles.skeleton.action
                    element.actionStatus = this.replacingRoles.skeleton.actionStatus
                    element.ability = this.replacingRoles.skeleton.ability
                    element.status = this.replacingRoles.skeleton.status
                }
            })
        },
        revive(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.dead = false
                }
            })
        },
        silence(target){
            this.gameSettings.selectedRoles.forEach(element => {
                if(element.player === target){
                    element.status.silenced = true
                }
            })
        },
    }
}