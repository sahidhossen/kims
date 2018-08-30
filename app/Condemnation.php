<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Condemnation extends Model
{
    protected $table = "condemnations";

    protected $fillable = [
        'term_id',
        'condemnation_name',
        'condemnation_date',
        'status'
    ];

    /*
     * Get condemnations by Unit ID
     *
     * Get all terms by Unit Id
     * @term_type=1
     *
     * @status=0
     */
    public static function getCondemnationByTermQuery( $where ){
        $result = [];
        $parsedTerms = TermRelation::getCondemnationByTermQuery($where);
        if(count($parsedTerms)>0)
            return $result;

        foreach ($parsedTerms as $term ){
            $foundCondemnation = Condemnation::where('term_id',$term->id)->first();
            $foundCondemnation->term = $term;
            array_push($result, $foundCondemnation);
        }
        return $result;
    }
}
