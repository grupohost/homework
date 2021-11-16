<?php
declare(strict_types=1);

/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link      https://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   https://opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller;

use Cake\Core\Configure;
use Cake\Http\Exception\ForbiddenException;
use Cake\Http\Exception\NotFoundException;
use Cake\Http\Response;
use Cake\View\Exception\MissingTemplateException;
use Cake\Controller\Component\RequestHandlerComponent;

/**
 * Static content controller
 *
 * This controller will render views from templates/Pages/
 *
 * @link https://book.cakephp.org/4/en/controllers/pages-controller.html
 */
class ApiController extends AppController
{

    public function initialize(): void
    {
        $this->loadComponent('RequestHandler');
    }

    protected function apicode(){
        return 'gjf94r4gtut546errtyrt8564wleskfwmalsdsfsf6547987';
    }

    protected function verifyCode($apicode){
        $result['value']=false;
        $seacrhapi=$this->apicode();
        if(isset($seacrhapi)){
            $result['value']=true;
            $result['msg']='Success connection';
        }else{
            $result['msg']="Api code not valid";
        }
        return $result;
    }

    protected function decodeFunction($params){
        $params=base64_decode($params);
        $params=json_decode($params);
        return $params;
    }

    public function v1($api=NULL,$params=NULL,$function){
        $verify=$this->verifyCode($api);
        if(!$verify['value']){
            $result['message']=$verify['msg'];
            $result['error']='1';
        }else{
            if(!is_null($params)){
                $params=$this->decodeFunction($params);
            }
            $result=$this->$function($params);
        }


        $this->set('result',$result);
    }

    protected function historical($paramas=NULL){
        $result['column_names']=['date','close','volume','open','high','low'];
        $result['data']=$this->getQueryAll('Historical')
            ->where([
                'date >='=>$paramas->start_date,
                'date <='=>$paramas->end_date,
            ])->order(['date'=>'ASC'])
        ;

        return $result;
    }

    protected function getStockInfo($paramas=NULL){
        $historical=$this->getQueryAll('Historical');
        $historical_newest=$historical->order(['date'=>'DESC'])->first()->date;
        $historical_oldest=$historical->order(['date'=>'ASC'])->first()->date;
        $result['name']='Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume';
        $result['newest_available_date']=$historical_newest;
        $result['oldest_available_date']=$historical_oldest;
        return $result;
    }




}
