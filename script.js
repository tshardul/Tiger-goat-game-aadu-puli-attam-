
var turn = 0
var tigers = 0
var goats = 0
var neutral = 0
var selected = false
var deadgoats = 0
var inctigers = 0
var end = true
var board = [
    ['pos-1'],
    ['pos-2','pos-3','pos-4','pos-5','pos-6','pos-7'],
    ['pos-8','pos-9','pos-10','pos-11','pos-12','pos-13'],
    ['pos-14','pos-15','pos-16','pos-17','pos-18','pos-19'],
    ['pps-20','pos-21','pos-22','pos-23']
]




function countHowMany(){
    tigers = 0
    goats = 0
    neutral = 0
    $('.pos').each(function(){
        let color = $(this).attr('fill')
        if (color === 'black'){
            neutral+=1
        }else if (color === 'orange'){
            tigers += 1
        }else if (color ==='blue'){
            goats+=1
        }
    })
    var counts = [tigers, goats, neutral]
    return(counts)
}



function validPositions(id, fill){
    let possible = []
    let actuposs = []
    let ultraposs = []
    
    if (id === 'pos-1'){
        possible = ['pos-3','pos-4','pos-5','pos-6']      
        ultraposs = ['pos-9','pos-10','pos-11','pos-12'] 

    }
    if (id === 'pos-2'){
        possible = ['pos-3','pos-8']
        ultraposs = ['pos-4','pos-14']
    }
    if (id ==='pos-3'){
        possible = ['pos-1','pos-2','pos-4','pos-9']
        ultraposs = ['0','0','pos-5','pos-15']
    } 
    if (id === 'pos-4'){
        possible=['pos-1','pos-3','pos-5','pos-10']
        ultraposs = ['0','pos-2','pos-6','pos-16']
    } 
    if (id === 'pos-5'){
        possible=['pos-1','pos-4','pos-6','pos-11']
        ultraposs = ['0','pos-3','pos-7','pos-17']
    } 
    if (id === 'pos-6'){
        possible = ['pos-1','pos-5','pos-7','pos-12']
        ultraposs = ['0','pos-4','0','pos-18']
    }
    if (id ==='pos-7'){
        possible = ['pos-6','pos-13']
        ultraposs = ['pos-5','pos-19']
    }
    if(id === 'pos-8'){
        possible=['pos-2','pos-9','pos-14']
        ultraposs = ['0','pos-10','0']
    }
    if(id==='pos-9'){
        possible=['pos-3','pos-10','pos-15','pos-8']
        ultraposs=['pos-1','pos-11','pos-20','0']
    }
    if (id === 'pos-10'){
        possible=['pos-4','pos-11','pos-16','pos-9']
        ultraposs=['pos-1','pos-12','pos-21','pos-8']
    }
    if(id === 'pos-11'){
        possible = ['pos-5','pos-12','pos-17','pos-10']
        ultraposs = ['pos-1','pos-13','pos-22','pos-9']
    }
    if(id ==='pos-12'){
        possible = ['pos-6','pos-13','pos-18','pos-11']
        ultraposs = ['pos-1','0','pos-23','pos-10']
    }
    if (id ==='pos-13'){
        possible = ['pos-7','pos-19','pos-12']
        ultraposs = ['0','0','pos-11']
    }
    if(id === 'pos-14'){
        possible = ['pos-8','pos-15']
        ultraposs = ['pos-2','pos-16']
    }
    if (id === 'pos-15'){
        possible = ['pos-9','pos-16','pos-20','pos-14']
        ultraposs = ['pos-3','pos-17','0','0']
    }
    if (id === 'pos-16'){
        possible = ['pos-10','pos-17','pos-21','pos-15']
        ultraposs = ['pos-4','pos-18','0','pos-14']
    }
    if (id === 'pos-17'){
        possible = ['pos-11','pos-18','pos-22','pos-16']
        ultraposs = ['pos-5','pos-19','0','pos-15']
    }
    if (id === 'pos-18'){
        possible = ['pos-12','pos-19','pos-23','pos-17']
        ultraposs = ['pos-6','0','0','pos-16']
    }
    if (id ==='pos-19'){
        possible = ['pos-13','pos-18']
        ultraposs = ['pos-7','pos-17']
    }
    if (id === 'pos-20'){
        possible = ['pos-15','pos-21']
        ultraposs = ['pos-9','pos-22']
    }
    if (id === 'pos-21'){
        possible = ['pos-16','pos-22','pos-20']
        ultraposs = ['pos-10','pos-23','0']
    } 
    if (id === 'pos-22'){
        possible = ['pos-17','pos-23','pos-21']
        ultraposs=['pos-11','0','pos-20']
    }
    if (id === 'pos-23'){
        possible = ['pos-18','pos-22']
        ultraposs = ['pos-12','pos-21']
    }
    for (i in possible){
        $('.pos').each(function(){
            let nid = $(this).attr('id')
            if (nid === possible[i]){
                if ($(this).attr('fill')==='black'){
                    actuposs.push(nid)
                }
                if(fill ==='orange'){
                    if($(this).attr('fill')==='blue'){                                                
                        let inddex = possible.indexOf(possible[i])                                             
                        actuposs.push(ultraposs[inddex])
                        actuposs.push('flag')
                        actuposs.push(possible[inddex])
                        
                    }
                }
                
            }
        })
    }
    return (actuposs)
}

function incornot(){
    let valids = []
    inctigers = 0
    let i = 0
    
    $('.pos').each(function(){
        let tcolor = $(this).attr('fill')
        
        if (tcolor === 'orange'){
            valids = validPositions($(this).attr('id'),tcolor)
            console.log(valids)
            while(i<valids.length) {
                if (valids[i] === 'flag'){
                    if ($('#'+valids[parseInt(i)-1]).attr('fill') != 'black'){                        
                        valids.splice((parseInt(i)-1),3)
                        i = i-3;
                        console.log(i)
                        console.log(valids)
                    }
                }
                i = i+1
            }
            if (valids.length === 0){
                inctigers += 1
            }
       
        }
    })
    if (inctigers === 3){
        $('.game-over').removeClass('hidden')
        $('.winner').html('Goats have won!')
    }
}



$('.pos').click(function(){
    var dont = false
    
    
    let color = $(this).attr('fill')
    if (turn === 1 & color === 'black' & !selected){
        alert('Please select a tiger to move')
    }
    if (turn === 1 & color ==='blue'){
        alert('Invalid move')
    }   
    if (turn === 1 & color ==='orange' & !selected){
        
        possible = validPositions($(this).attr('id'), $(this).attr('fill'))
        
        
        
        $('game-state').html('Select a place to move to:')
        var count = 0
        for (i in possible){
            
            
            $('.pos').each(function(){
                let id = $(this).attr('id')
                if (id === possible[i]){
                    
                    if($('#'+possible[i]).attr('fill')==='black'){
                        $('#'+possible[i]).addClass('valid')      
                  }
                    if (possible[parseInt(i)+1]==='flag'){
                        count+=1
                        $('#'+possible[i]).addClass('jumped'+count)
                        $('#'+possible[parseInt(i)+2]).addClass('validjump'+count)
                    }                                               
                   
                }
            })            
        }
        if (!$('.pos').hasClass('valid')){
            alert('Invalid tiger')
        }
        else {
            $(this).attr('fill','black')
            selected = true
        }
        
    }
    if(turn === 1 & color ==='black' & selected & $(this).hasClass('valid')){
        $(this).attr('fill','orange')
        if ($(this).hasClass('jumped1')){
            deadgoats +=1
            $('.validjump1').attr('fill','black')
        }
        if ($(this).hasClass('jumped2')){
            deadgoats += 1
            $('.validjump2').attr('fill','black')
        }
        if ($(this).hasClass('jumped3')){
            deadgoats +=1
            $('.validjump3').attr('fill','black')
        }
        if ($(this).hasClass('jumped4')){
            deadgoats +=1
            $('.validjump4').attr('fill','black')
        }
        $('#dead-goats-count').html(deadgoats)
        selected=false
        dont = true
        $('.pos').removeClass('valid')
        $('.pos').removeClass('jumped1')
        $('.pos').removeClass('jumped2')
        $('.pos').removeClass('jumped3')
        $('.pos').removeClass('jumped4')
        $('.pos').removeClass('validjump1')
        $('.pos').removeClass('validjump2')
        $('.pos').removeClass('validjump3')
        $('.pos').removeClass('validjump4')
        changeTurn()
    }
    if(turn === 1 & color ==='black' & selected & !$(this).hasClass('valid')){
        alert("This is an invalid move, please make sure you move to one of the translucent circles")
    }
    
    if (turn === 0 & color === 'black' & countHowMany()[1]+deadgoats<15 & !dont &!selected){
        $(this).attr('fill','blue')
        $('.goat-count').html(15-countHowMany()[1]-deadgoats) 
        
        changeTurn()   
    }
    if (countHowMany()[1]+deadgoats===15 & turn ===0 & !dont){
        if  (color === 'blue' & !selected){
            possible = validPositions($(this).attr('id'), $(this).attr('fill'))
            console.log(possible)
            $(this).attr('fill','black')
        
            $('.game-state').html('Select a place to move to')
            for (i in possible) {
                $('.pos').each(function(){
                    let id = $(this).attr('id')
                    if (id === possible[i]){
                        
                        if($('#'+possible[i]).attr('fill')==='black'){
                            $('#'+possible[i]).addClass('valid')      
                      }                                                
                       
                    }
                })      
            }
            deadgoats += 1     
            end = false       
            selected = true
        }
        if (color === 'orange' || color === 'black' & !selected){
            alert('Invalid move, pls select a goat to move')
        }
        
        if (color === 'black' & selected & $(this).hasClass('valid')){
            $(this).attr('fill','blue')
            selected = false
            deadgoats -= 1
            end = true
            
            $('.pos').removeClass('valid')
            changeTurn()            
        }
        
    }
    if (turn === 0 & color === 'orange' & !dont ){
        alert('Invalid move')
    }
     
    if (deadgoats === 5 & end){
        $('.game-over').removeClass('hidden')
        $('.winner').html('Tigers have won!')
    }
    incornot()
})

$('.restart').click(function(){
    $('.pos').attr('fill','black')
    $('.tiger').attr('fill','orange')
    $('.game-over').addClass('hidden')
    deadgoats = 0
    inctigers = 0
    turn = 1
    selected = false
    changeTurn()
    $('.goat-count').html(15-countHowMany()[1]-deadgoats)
    $('#dead-goats-count').html(deadgoats)
    $('.winner').html('')
})

function changeTurn (){
    turn = (turn +1)%2
     if (turn === 0){
         $('.heading').html('Goat')
         $('.game-state').html('Select or place a goat!')

     } if (turn === 1){
         $('.heading').html('Tiger')  
         $('.game-state').html('Select a tiger to move!')       
     }  
}