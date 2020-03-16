/**
 * Vídeo #1 e #2: Requisições Externas (fetch) - Módulo 12 - Requisições, Web Services e Banco de Dados - B7Web
 * Obs.: Operação READ de uma API na web.
 * Link para um tutorial sobre Promise: https://blog.rocketseat.com.br/javascript-assincrono-promises/
 * by: Vagner Pinto
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

export default class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmes:[],
            loading:true
        };

        fetch('https://filmespy.herokuapp.com/api/v1/filmes')
            .then(response=>response.json())
            .then((json)=>{
                let s = this.state;
                s.filmes = json.filmes;
                s.loading = false;
                this.setState(s);
                console.log(json); //utiliza o plugin do Chrome para depurar
            });
    }

    render() {
        if(this.state.loading){
            return(
                <View style={[styles.container, styles.loading]}>
                    <Text style={styles.lodingText}>Carregando ...</Text>
                </View>
            );
        }else{
            return (
                <View styles={styles.container}>
                    <FlatList
                        data={this.state.filmes}
                        renderItem={({item})=><Filme data={item}/>}
                        keyExtractor={(item, index)=>item.titulo}
                    />
                </View>
            );
        }
    }
}

class Filme extends Component{
    render(){
        return(
            <View style={styles.filmesArea}>
                <Image source={{uri:this.props.data.poster.replace('http:', 'https:')}} style={styles.filmeImagem} />
                <View  style={styles.filmeInfo}>
                    <Text style={styles.filmeNome}>{this.props.data.titulo}</Text>
                    <Text>{this.props.data.data}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 20,
    },
    filmesArea:{
        flex:1,
        flexDirection:'row',
        margin:10
    },
    filmeImagem:{
        width:80,
        height:110,
        marginRight:10
    },
    filmeItem:{
        flex:1,
        flexDirection:'column',
    },
    filmeNome:{
        fontSize:18,
        fontWeight:'bold'
    },
    loading:{
        justifyContent:'center',
        alignItems:'center'
    },
    lodingText:{
        fontSize:18,
        fontWeight:'bold'
    }
});

