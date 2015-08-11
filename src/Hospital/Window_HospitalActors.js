/* globals YED: false */

(function() {
    /**
     * Window shows actors list for hospital.
     *
     * @class
     * @extends external:Window_Selectable
     * @memberof YED.Hospital
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} wh Window Height
     */
    var Window_HospitalActors = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    Window_HospitalActors.prototype =
        Object.create(Window_Selectable.prototype);
    Window_HospitalActors.prototype.constructor = Window_HospitalActors;

    /**
     * Initialize
     *
     * @constructs Window_HospitalActors
     */
    Window_HospitalActors.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();

        Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
        this.refresh();
    };

    /**
     * Window height for initialize.
     *
     * @return {number} Window Height
     */
    Window_HospitalActors.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    /**
     * Refresh Window contents.
     */
    Window_HospitalActors.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    /**
     * Get actors list.
     */
    Window_HospitalActors.prototype.makeItemList = function() {
        this._data = $gameParty.members();
    };

    /**
     * Get current actor.
     *
     * @return {Game_Actor} Current select actor
     */
    Window_HospitalActors.prototype.actor = function() {
        return this._data[this.index()];
    };

    /**
     * Check if current actor is hospitalizable.
     *
     * @return {Boolean} Enabled Flag
     */
    Window_HospitalActors.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.actor());
    };

    /**
     * Check if current actor is hospitalizable.
     *
     * @return {Boolean} Enabled Flag
     */
    Window_HospitalActors.prototype.isEnabled = function(actor) {
        return !!actor ? actor.isHospitalizable() : false;
    };

    /**
     * Get party current size.
     *
     * @return {number} Total actors
     */
    Window_HospitalActors.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    /**
     * Draw actor status.
     *
     * @param  {number} index Actor Index
     */
    Window_HospitalActors.prototype.drawItem = function(index) {
        var actor = this._data[index],
            rect = this.itemRect(index),
            gaugeWidth = 0,
            offsetX = 0;

        if (!actor) {
            return;
        }

        gaugeWidth = this.contentsWidth()
            - (168 * 2 + Window_Base._iconWidth * 3 + this.textPadding() * 2);
        gaugeWidth = gaugeWidth / 2 - 8;

        offsetX = this.textPadding();
        this.drawActorName(actor, rect.x + offsetX, rect.y, 168);

        offsetX = offsetX + 168;
        this.drawActorIcons(actor, rect.x + offsetX, rect.y, Window_Base._iconWidth * 3);

        offsetX = offsetX + Window_Base._iconWidth * 3;
        this.drawActorHp(actor, rect.x + offsetX, rect.y, gaugeWidth);

        offsetX = offsetX + gaugeWidth + 8;
        this.drawActorMp(actor, rect.x + offsetX, rect.y, gaugeWidth);

        offsetX = offsetX + gaugeWidth;
        this.drawActorHospital(actor, rect.x + offsetX, rect.y, 168);
    };

    /**
     * Draw actor hospital fees.
     *
     * @param  {Game_Actor} actor Actor
     * @param  {number} x     Draw at X
     * @param  {number} y     Draw at Y
     * @param  {number} width Limit Text Width
     */
    Window_HospitalActors.prototype.drawActorHospital = function(actor, x, y, width) {
        width = width || 168;
        this.drawCurrencyValue(actor.hospitalFee(),
            this.currencyUnit(), x, y, width);
    };

    /**
     * Get currency unit.
     *
     * @return {String} Currency Unit
     */
    Window_HospitalActors.prototype.currencyUnit = function() {
        return TextManager.currencyUnit;
    };

    /**
     * Update help window
     */
    Window_HospitalActors.prototype.updateHelp = function() {
        var symbol = '';

        if (!this.actor()) {
            return;
        }

        symbol = this._getHelpSymbol();
        this._helpWindow.setSymbol(symbol, this.actor());
    };

    /**
     * Get text symbol for displaying help
     *
     * @private
     */
    Window_HospitalActors.prototype._getHelpSymbol = function() {
        var symbol = '';

        if (this.actor().isHealthy()) {
            symbol = 'Actor Help (Healthy)';
        } else {
            symbol = 'Actor Help (Treat)';
        }

        return symbol;
    };

    YED.Hospital.Window_HospitalActors = Window_HospitalActors;
}());
