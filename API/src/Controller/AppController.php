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

use Cake\Controller\Controller;

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link https://book.cakephp.org/4/en/controllers.html#the-app-controller
 */
class AppController extends Controller
{
    /**
     * Initialization hook method.
     *
     * Use this method to add common initialization code like loading components.
     *
     * e.g. `$this->loadComponent('FormProtection');`
     *
     * @return void
     */
    public function initialize(): void
    {
        parent::initialize();

        $this->loadComponent('RequestHandler');
        $this->loadComponent('Flash');

        /*
         * Enable the following component for recommended CakePHP form protection settings.
         * see https://book.cakephp.org/4/en/controllers/components/form-protection.html
         */
        //$this->loadComponent('FormProtection');
    }

    protected function getQueryAll($model){
        $this->loadModel($model);
        $query=$this->$model->find('all');
        return $query;
    }

    protected function newQuery($model,$fields=array()){
        $this->loadModel($model);
        $query=$this->$model->newEmptyEntity();
        foreach($fields as $key=>$f){
            $query->$key=$f;
        }
        $saved=$this->$model->save($query);
        return $saved;
    }

    protected function updateQuery($model,$fields=array(),$id){
        $this->loadModel($model);
        $query=$this->$model->get($id);
        foreach($fields as $key=>$f){
            if($f == 'true'){
                $f=TRUE;
            }
            $query->$key=$f;
        }
        $saved=$this->$model->save($query);
        return $saved;
    }

    protected function getQuery($model,$id,$contain=NULL){
        $this->loadModel($model);
        if(is_null($contain)){
            $get=$this->$model->get($id);
        }else{
            $get=$this->$model->find('all')->contain($contain)->where([$model.'.id'=>$id])->first();
        }
        return $get;
    }
}
